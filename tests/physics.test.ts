import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EQUATOR_MGAL,
  anomaliesFromObservation,
  bouguerCorrection,
  classifyAnomaly,
  freeAirCorrection,
  lessonTraverseMgal,
  observationFromBouguer,
  profileBouguer,
  profileBuried,
  profileFreeAir,
  profileTerrain,
  seaBouguer,
  sphereAnomalyMgal,
  theoreticalGravity,
} from "../web/src/physics.ts";

describe("theoretical gravity", () => {
  it("matches the equator anchor", () => {
    assert.ok(Math.abs(theoreticalGravity(0) - EQUATOR_MGAL) < 1e-6);
  });

  it("matches the published pole value of the 1967 formula", () => {
    assert.ok(Math.abs(theoreticalGravity(90) - 983_217.72) < 0.02);
  });

  it("increases from equator to pole", () => {
    assert.ok(theoreticalGravity(0) < theoreticalGravity(25) && theoreticalGravity(25) < theoreticalGravity(90));
  });
});

describe("corrections", () => {
  it("uses 0.308 mGal per metre", () => {
    assert.equal(freeAirCorrection(1000), 308);
  });

  it("builds the familiar 0.112 mGal/m slab at crustal density", () => {
    const perMetre = bouguerCorrection(1, 2.67);
    assert.ok(Math.abs(perMetre - 0.112) < 0.001);
  });

  it("makes the marine slab negative", () => {
    const bc = seaBouguer(1000);
    assert.ok(bc < 0);
    assert.ok(Math.abs(bc - -68.7) < 0.2);
  });
});

describe("anomaly round trip", () => {
  it("recovers a land Bouguer anomaly", () => {
    const input = {
      boug: 12.5,
      phiDeg: 23.5,
      height: 3952,
      density: 2.67,
      mode: "land" as const,
      waterDepth: 0,
    };
    const gObs = observationFromBouguer(input);
    const parts = anomaliesFromObservation({ ...input, gObs });
    assert.ok(Math.abs(parts.boug - 12.5) < 1e-6);
    assert.ok(parts.fac > parts.bc);
  });

  it("recovers a marine anomaly and adds back the water deficit", () => {
    const input = {
      boug: 5,
      phiDeg: 20,
      height: 0,
      density: 2.67,
      mode: "sea" as const,
      waterDepth: 2800,
    };
    const gObs = observationFromBouguer(input);
    const parts = anomaliesFromObservation({ ...input, gObs });
    assert.ok(Math.abs(parts.boug - 5) < 1e-6);
    assert.ok(parts.bc < 0);
    assert.ok(parts.fa < parts.boug);
  });
});

describe("buried sphere", () => {
  it("is positive over extra mass and decays off to the side", () => {
    const peak = sphereAnomalyMgal(0, 220, 140, 1800);
    const side = sphereAnomalyMgal(600, 220, 140, 1800);
    assert.ok(peak > 2 && peak < 4);
    assert.ok(side > 0 && side < peak / 5);
  });

  it("puts a high over ore and a low over the cave", () => {
    assert.ok(lessonTraverseMgal(280) > 2);
    assert.ok(lessonTraverseMgal(730) < -2);
    assert.equal(classifyAnomaly(lessonTraverseMgal(280)), "high");
    assert.equal(classifyAnomaly(lessonTraverseMgal(730)), "low");
  });
});

describe("teaching profile", () => {
  it("keeps the ore off the summit", () => {
    let summit = 0;
    let summitH = -1;
    for (let x = 0; x <= 100; x += 0.5) {
      const h = profileTerrain(x);
      if (h > summitH) {
        summitH = h;
        summit = x;
      }
    }
    assert.ok(Math.abs(summit - 33) < 2);
    assert.ok(Math.abs(76 - summit) > 30);
  });

  it("lets free-air follow the hill and Bouguer follow the ore", () => {
    let faX = 0;
    let faV = -1e9;
    let bgX = 0;
    let bgV = -1e9;
    for (let x = 0; x <= 100; x += 0.5) {
      const fa = profileFreeAir(x);
      const bg = profileBouguer(x, 2.67);
      if (fa > faV) {
        faV = fa;
        faX = x;
      }
      if (bg > bgV) {
        bgV = bg;
        bgX = x;
      }
    }
    assert.ok(Math.abs(faX - 33) < 4);
    assert.ok(Math.abs(bgX - 76) < 2);
    assert.ok(profileBuried(76) > 8);
    assert.ok(profileBouguer(33, 2.0) > profileBouguer(33, 2.67) + 10);
  });
});
