import { useMemo, useState } from "react";
import {
  PROFILE_ORE_X_KM,
  profileBouguer,
  profileFreeAir,
  profileTerrain,
} from "../physics";
import { Tx, useStore } from "../store";

type Sample = { x: number; h: number; fa: number; bg: number };

function build(density: number): Sample[] {
  return Array.from({ length: 201 }, (_, index) => {
    const x = index * 0.5;
    return {
      x,
      h: profileTerrain(x),
      fa: profileFreeAir(x),
      bg: profileBouguer(x, density),
    };
  });
}

function peak(samples: Sample[], key: "h" | "fa" | "bg"): Sample {
  return samples.reduce((best, sample) => (sample[key] > best[key] ? sample : best));
}

export function ProfileLab({ stage }: { stage: "freeair" | "bouguer" }) {
  const { lang } = useStore();
  const [density, setDensity] = useState(2.67);
  const [applied, setApplied] = useState(stage === "freeair");
  const [zoom, setZoom] = useState(false);
  const samples = useMemo(() => build(density), [density]);
  const showBouguer = stage === "bouguer" && applied;
  const topo = peak(samples, "h");
  const fa = peak(samples, "fa");
  const bg = peak(samples, "bg");

  const values = samples.flatMap((sample) => (zoom && showBouguer ? [sample.bg] : showBouguer ? [sample.fa, sample.bg] : [sample.fa]));
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;

  const xPix = (x: number) => 56 + (x / 100) * 760;
  const yTerrain = (h: number) => 168 - (h / 800) * 130;
  const yAnom = (value: number) => 210 + (1 - (value - min) / (max - min)) * 230;

  const terrain = samples
    .map((sample, index) => `${index === 0 ? "M" : "L"}${xPix(sample.x).toFixed(1)},${yTerrain(sample.h).toFixed(1)}`)
    .join(" ");
  const terrainFill = `${terrain} L${xPix(100).toFixed(1)},168 L${xPix(0).toFixed(1)},168 Z`;
  const line = (key: "fa" | "bg") =>
    samples
      .map((sample, index) => `${index === 0 ? "M" : "L"}${xPix(sample.x).toFixed(1)},${yAnom(sample[key]).toFixed(1)}`)
      .join(" ");

  return (
    <div className="widget">
      <div className="widget-bar">
        <div className="legend">
          <span><i className="swatch" style={{ background: "#c9a27a" }} />{lang === "zh" ? "地形" : "terrain"}</span>
          <span><i className="swatch" style={{ background: "#1e5160" }} />{lang === "zh" ? "自由空間" : "free-air"}</span>
          {showBouguer ? <span><i className="swatch" style={{ background: "#c24c22" }} />{lang === "zh" ? "布格" : "Bouguer"}</span> : null}
        </div>
        {stage === "bouguer" ? (
          <div className="steps">
            <button type="button" className="btn small dark" onClick={() => { setApplied(true); setZoom(false); }}>
              <Tx zh="施作布格校正" en="Apply the Bouguer correction" />
            </button>
            <button type="button" className={zoom ? "btn small dark" : "btn small ghost"} onClick={() => setZoom((value) => !value)} disabled={!applied}>
              <Tx zh="放大布格曲線" en="Zoom the Bouguer curve" />
            </button>
          </div>
        ) : null}
      </div>
      <p className="muted">
        <Tx
          zh="教學剖面。真密度 2.67 g/cm³，區域場已移除。"
          en="Teaching profile. True density 2.67 g/cm³. The regional field is removed."
        />
      </p>
      <svg className="profile" viewBox="0 0 840 470" role="img">
        <path d={terrainFill} fill="#e7d3b4" />
        <path d={terrain} fill="none" stroke="#8d5a3c" strokeWidth="2" />
        <line x1={xPix(topo.x)} y1={yTerrain(topo.h)} x2={xPix(topo.x)} y2="168" stroke="#8d5a3c" strokeDasharray="3 4" />
        <line x1={xPix(PROFILE_ORE_X_KM)} y1="188" x2={xPix(PROFILE_ORE_X_KM)} y2="450" stroke="#c24c22" strokeDasharray="3 4" />
        <text x={xPix(topo.x) + 8} y={yTerrain(topo.h) + 14} fill="#8d5a3c" fontSize="12">
          {lang === "zh" ? "山頂" : "summit"}
        </text>
        <text x={xPix(PROFILE_ORE_X_KM)} y="464" textAnchor="middle" fill="#c24c22" fontSize="12">
          {lang === "zh" ? "埋藏高密度體" : "buried dense body"}
        </text>
        {!(zoom && showBouguer) ? <path d={line("fa")} fill="none" stroke="#1e5160" strokeWidth="2.4" /> : null}
        {showBouguer ? <path d={line("bg")} fill="none" stroke="#c24c22" strokeWidth="2.4" /> : null}
      </svg>
      {stage === "bouguer" ? (
        <label>
          <span className="muted">
            <Tx zh={`假設的平板密度 ${density.toFixed(2)} g/cm³`} en={`Assumed slab density ${density.toFixed(2)} g/cm³`} />
          </span>
          <input className="slider" type="range" min={1.8} max={3.2} step={0.01} value={density} onChange={(event) => setDensity(Number(event.target.value))} />
        </label>
      ) : null}
      <p>
        <Tx
          zh={`自由空間最高點在 ${fa.x.toFixed(0)} km，地形最高點在 ${topo.x.toFixed(0)} km，兩者靠近。`}
          en={`The free-air peak is at ${fa.x.toFixed(0)} km and the summit at ${topo.x.toFixed(0)} km. They sit together.`}
        />
      </p>
      {showBouguer ? (
        <p>
          {Math.abs(density - 2.67) < 0.03 ? (
            <Tx
              zh={`密度用對時，布格最高點移到 ${bg.x.toFixed(0)} km，靠近埋藏體，而不是山頂。`}
              en={`With the right density, the Bouguer peak moves to ${bg.x.toFixed(0)} km, near the buried body rather than the summit.`}
            />
          ) : (
            <Tx
              zh={`這個密度和真密度不同，布格最高點在 ${bg.x.toFixed(0)} km。地形的形狀又殘留在曲線上。`}
              en={`This density is not the true one, and the Bouguer peak is at ${bg.x.toFixed(0)} km. Terrain shape leaks back into the curve.`}
            />
          )}
        </p>
      ) : null}
    </div>
  );
}
