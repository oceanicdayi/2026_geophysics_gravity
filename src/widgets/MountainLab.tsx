import { useState } from "react";
import { formatMgal, freeAirCorrection, theoreticalGravity } from "../physics";
import { Tx, useStore } from "../store";

const PHI = 23.5;
const HEIGHT = 1000;

export function MountainLab() {
  const { lang } = useStore();
  const [step, setStep] = useState(1);
  const gt = theoreticalGravity(PHI);
  const fac = freeAirCorrection(HEIGHT);
  const reading = gt - fac;
  const mistaken = reading - fac;
  const restored = reading + fac;

  const rows = [
    {
      zh: "海平面理論值 gₜ",
      en: "Sea-level gₜ",
      value: gt,
      show: true,
      kind: "base" as const,
    },
    {
      zh: "山上的讀數",
      en: "Reading on the mountain",
      value: reading,
      show: step >= 1,
      kind: "base" as const,
    },
    {
      zh: "若再減一次 FAC",
      en: "If FAC is subtracted again",
      value: mistaken,
      show: step >= 2,
      kind: "bad" as const,
    },
    {
      zh: "加回 FAC 之後",
      en: "After adding FAC",
      value: restored,
      show: step >= 3,
      kind: "good" as const,
    },
  ];

  const min = mistaken - 40;
  const max = gt + 40;

  return (
    <div className="widget">
      <div className="steps">
        {[1, 2, 3].map((item) => (
          <button key={item} type="button" className={step === item ? "btn small dark" : "btn small ghost"} onClick={() => setStep(item)}>
            {item === 1 ? <Tx zh="1 山上讀數" en="1 Mountain reading" /> : null}
            {item === 2 ? <Tx zh="2 誤減" en="2 Subtract by mistake" /> : null}
            {item === 3 ? <Tx zh="3 加回 FAC" en="3 Add FAC" /> : null}
          </button>
        ))}
      </div>
      <p>
        {step === 1 ? (
          <Tx
            zh={`同一緯度 ${PHI}°，海拔 ${HEIGHT} m。只因為離地心更遠，讀數比海平面理論值少了 ${formatMgal(fac, 0)} mGal。`}
            en={`Same latitude, ${PHI}°. Elevation ${HEIGHT} m. Only because the station is farther from Earth’s center, the reading is ${formatMgal(fac, 0)} mGal below sea-level gₜ.`}
          />
        ) : null}
        {step === 2 ? (
          <Tx
            zh="若把「校正」理解成再減掉高度，基準面不會回來，數值會離海平面更遠。"
            en="If “correction” is taken to mean subtracting the height again, the datum does not come back. The number moves farther from sea level."
          />
        ) : null}
        {step === 3 ? (
          <Tx
            zh="山上少掉的重力要加回來。FAC = 0.308 × h。沒有額外地質時，加完就回到 gₜ。"
            en="The gravity lost on the mountain is added back. FAC = 0.308 × h. With no extra geology, the sum returns to gₜ."
          />
        ) : null}
      </p>
      <div className="gauge-list">
        {rows.filter((row) => row.show).map((row) => {
          const width = ((row.value - min) / (max - min)) * 100;
          return (
            <div className="gauge-row" key={row.en}>
              <span>{lang === "zh" ? row.zh : row.en}</span>
              <div className="gauge">
                <i className={row.kind === "bad" ? "bad" : row.kind === "good" ? "good" : ""} style={{ width: `${width}%` }} />
              </div>
              <b>{formatMgal(row.value, 1)}</b>
            </div>
          );
        })}
      </div>
      <p className="muted">
        <Tx
          zh={`高度若到 3,952 m（玉山的量級），同樣的梯度約是 ${formatMgal(freeAirCorrection(3952), 0)} mGal。這遠大於礦體的數毫伽，所以高程不能留在讀數裡。`}
          en={`At 3,952 m, a Yushan-scale elevation, the same gradient is about ${formatMgal(freeAirCorrection(3952), 0)} mGal. That dwarfs an ore signal of a few milligal, so elevation cannot stay inside the reading.`}
        />
      </p>
    </div>
  );
}
