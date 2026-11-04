import { useState } from "react";
import { formatMgal, seaBouguer } from "../physics";
import { Tx } from "../store";

export function SeaLab() {
  const [depth, setDepth] = useState(2500);
  const bc = seaBouguer(depth);
  const added = -bc;

  return (
    <div className="widget">
      <svg className="profile" viewBox="0 0 640 220" role="img">
        <rect x="0" y="0" width="640" height="220" fill="#d8c3a4" />
        <rect x="0" y="0" width="640" height="34" fill="#f6efe4" />
        <rect x="0" y="34" width="640" height={36 + (depth / 5000) * 120} fill="#7eb7c2" />
        <path d="M300 22 h40 l-8 12 h-24 z" fill="#163844" />
        <text x="16" y="22" fill="#163844" fontSize="14">
          {depth.toFixed(0)} m
        </text>
      </svg>
      <label>
        <span className="muted">
          <Tx zh="水深" en="Water depth" /> {depth.toFixed(0)} m
        </span>
        <input className="slider" type="range" min={200} max={5000} step={50} value={depth} onChange={(event) => setDepth(Number(event.target.value))} />
      </label>
      <div className="chain">
        <div>
          <span>BCₛ = 0.0419 (1.03 − 2.67) h</span>
          <span>{formatMgal(bc, 1)} mGal</span>
        </div>
        <div>
          <span>− BCₛ</span>
          <span>+{formatMgal(added, 1)} mGal</span>
        </div>
      </div>
      <p>
        <Tx
          zh="海水比課程使用的地殼密度 2.67 g/cm³ 輕，所以這一項是負的。計算海上布格異常時減去一個負數，等於把缺少的質量補回來。"
          en="Seawater is lighter than the 2.67 g/cm³ crust used in the course, so this term is negative. Subtracting a negative number when the marine Bouguer anomaly is formed puts the missing mass back."
        />
      </p>
    </div>
  );
}
