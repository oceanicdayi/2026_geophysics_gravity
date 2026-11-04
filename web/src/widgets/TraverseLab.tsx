import { useState } from "react";
import { formatMgal, lessonTraverseMgal } from "../physics";
import { Tx, useStore } from "../store";

const WIDTH = 1000;
const HEIGHT = 360;

export function TraverseLab() {
  const { lang } = useStore();
  const [x, setX] = useState(40);
  const g = lessonTraverseMgal(x);
  const samples = Array.from({ length: 101 }, (_, index) => {
    const metre = index * 10;
    return { metre, g: lessonTraverseMgal(metre) };
  });
  const maxAbs = Math.max(...samples.map((sample) => Math.abs(sample.g)), 1);

  const plot = samples
    .map((sample, index) => {
      const px = 50 + (sample.metre / 1000) * 910;
      const py = 150 - (sample.g / maxAbs) * 110;
      return `${index === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");

  const stationX = 50 + (x / 1000) * 910;
  const stationY = 150 - (g / maxAbs) * 110;

  return (
    <div className="widget">
      <svg className="profile" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img">
        <text x="50" y="24" fill="#74685c" fontSize="13">
          {lang === "zh" ? "教學用球體模型 · mGal" : "Teaching spheres · mGal"}
        </text>
        <line x1="50" y1="150" x2="960" y2="150" stroke="#d9cdb8" />
        <path d={plot} fill="none" stroke="#9d3418" strokeWidth="2.5" />
        <circle cx={stationX} cy={stationY} r="5" fill="#163844" />
        <line x1={stationX} y1="170" x2={stationX} y2="250" stroke="#163844" strokeDasharray="4 4" />
        <path d={`M${stationX - 10} 248 h20 l-10 16 z`} fill="#163844" />
        <ellipse cx="280" cy="300" rx="70" ry="36" fill="#c24c22" opacity="0.9" />
        <ellipse cx="730" cy="292" rx="58" ry="32" fill="#185f86" />
        <text x="280" y="304" textAnchor="middle" fill="#fffaf5" fontSize="13">
          {lang === "zh" ? "高密度" : "dense"}
        </text>
        <text x="730" y="296" textAnchor="middle" fill="#fffaf5" fontSize="13">
          {lang === "zh" ? "空洞" : "void"}
        </text>
        <path d="M40 250 H970" stroke="#8d5a3c" strokeWidth="8" />
      </svg>
      <label>
        <span className="muted">
          <Tx zh="沿測線移動重力儀" en="Move the gravimeter along the line" />
        </span>
        <input
          className="slider"
          type="range"
          min={0}
          max={1000}
          step={5}
          value={x}
          onChange={(event) => setX(Number(event.target.value))}
        />
      </label>
      <div className="big-num">
        Δg = {formatMgal(g, 2)} mGal
      </div>
      <p>
        {g >= 2 ? (
          <Tx zh="現在是重力高。腳下的質量比周圍多。" en="This is a gravity high. There is more mass than in the surroundings." />
        ) : g <= -2 ? (
          <Tx zh="現在是重力低。腳下的質量比周圍少。" en="This is a gravity low. There is less mass than in the surroundings." />
        ) : (
          <Tx zh="這裡接近背景。異常很小。" en="This is close to the background. The anomaly is small." />
        )}
      </p>
      <p className="muted">
        <Tx
          zh="曲線用埋藏球體的垂直引力算出來。正值約數毫伽，對照地球表面約 980,000 mGal，這就是探勘要抓的那一點點。"
          en="The curve is the vertical pull of buried spheres. A few milligal, set against about 980,000 mGal at Earth’s surface, is the size prospecting hunts."
        />
      </p>
    </div>
  );
}
