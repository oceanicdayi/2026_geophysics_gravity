import { useState } from "react";
import { formatMgal, theoreticalGravity } from "../physics";
import { Tx, useStore } from "../store";

export function LatitudeLab() {
  const { lang } = useStore();
  const [phi, setPhi] = useState(23.5);
  const gt = theoreticalGravity(phi);
  const equator = theoreticalGravity(0);
  const pole = theoreticalGravity(90);
  const gap = pole - equator;
  const along = (gt - equator) / gap;

  return (
    <div className="widget">
      <div className="lat-layout">
        <Earth phi={phi} />
        <div>
          <label>
            <span className="muted">
              <Tx zh="緯度 φ" en="Latitude φ" />
            </span>
            <input
              className="slider"
              type="range"
              min={0}
              max={90}
              step={0.5}
              value={phi}
              onChange={(event) => setPhi(Number(event.target.value))}
              aria-valuetext={`${phi}°`}
            />
          </label>
          <div className="big-num">{formatMgal(gt, 2)} mGal</div>
          <p className="muted">
            {lang === "zh" ? `φ = ${phi.toFixed(1)}°，相對赤道多了 ` : `φ = ${phi.toFixed(1)}°, `}
            {formatMgal(gt - equator, 1)} mGal
            {lang === "zh" ? "。" : " above the equator."}
          </p>
        </div>
      </div>
      <div className="bar-track" aria-hidden="true">
        <i
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 3,
            background: "#f0b429",
            left: `${along * 100}%`,
          }}
        />
      </div>
      <div className="scale-caption">
        <span>
          <Tx zh="赤道" en="Equator" /> {formatMgal(equator, 1)}
        </span>
        <span>
          <Tx zh="兩極" en="Poles" /> {formatMgal(pole, 1)}
        </span>
      </div>
      <p>
        <Tx
          zh={`赤道到兩極約 ${formatMgal(gap, 0)} mGal。探勘裡一個礦體常常只有 0.1 到 10 mGal，所以緯度這一整段必須先從讀數裡拿走。`}
          en={`Equator to pole is about ${formatMgal(gap, 0)} mGal. An ore body is often only 0.1 to 10 mGal, so this whole latitude term has to leave the reading first.`}
        />
      </p>
      <div className="note-grid">
        <div className="note">
          <Tx
            zh="離心力在赤道最大、兩極為零，方向向外，會抵掉一部分重力。"
            en="Centrifugal acceleration is largest at the equator and zero at the poles. It points outward and cancels part of g."
          />
        </div>
        <div className="note">
          <Tx
            zh="地球是扁球，赤道離地心較遠，平方反比讓 g 變小。隆起的額外質量會把 g 拉高一點，但前兩項贏了。"
            en="The equatorial bulge increases distance from the center, so the inverse square law lowers g. Extra bulge mass pulls the other way, but the first two effects win."
          />
        </div>
      </div>
    </div>
  );
}

function Earth({ phi }: { phi: number }) {
  const rad = ((90 - phi) * Math.PI) / 180;
  const x = 110 + Math.cos(rad) * 78;
  const y = 110 - Math.sin(rad) * 62;
  return (
    <svg className="earth" viewBox="0 0 220 220" role="img" aria-label="Earth">
      <ellipse cx="110" cy="110" rx="86" ry="70" fill="#1e5160" />
      <ellipse cx="110" cy="110" rx="86" ry="28" fill="none" stroke="#f0d7b0" strokeDasharray="3 4" />
      <path d="M110 40 V180" stroke="#f6efe4" strokeOpacity="0.45" />
      <circle cx={x} cy={y} r="6" fill="#e07a3d" />
      <text x="110" y="208" textAnchor="middle" fill="#74685c" fontSize="12">
        {phi.toFixed(1)}°
      </text>
    </svg>
  );
}
