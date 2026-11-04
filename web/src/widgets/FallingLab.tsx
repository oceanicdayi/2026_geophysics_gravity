import { useEffect, useState, type ReactNode } from "react";
import { Formula, Frac, Var } from "../components/Bits";
import { Tx, tx, useStore } from "../store";

function position(mode: "vacuum" | "air", which: "safe" | "feather", seconds: number): number {
  const vacuum = Math.min(1, 0.5 * 1.55 * seconds * seconds);
  if (mode === "vacuum" || which === "safe") return vacuum;
  const terminal = 0.28 * (seconds - 0.45 * (1 - Math.exp(-seconds / 0.45)));
  return Math.min(1, terminal);
}

export function FallingLab() {
  const { lang } = useStore();
  const [mode, setMode] = useState<"vacuum" | "air">("vacuum");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showMath, setShowMath] = useState(false);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const started = performance.now();
    const step = (now: number) => {
      const elapsed = (now - started) / 1000;
      setSeconds(elapsed);
      if (elapsed < 4.4) frame = requestAnimationFrame(step);
      else setRunning(false);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const safeY = position(mode, "safe", seconds);
  const featherY = position(mode, "feather", seconds);
  const travel = (value: number) => `calc(${(value * 86).toFixed(2)}% )`;

  return (
    <div className="widget">
      <div className="widget-bar">
        <div className="seg" role="group" aria-label={tx(lang, "環境", "Environment")}>
          <button type="button" className={mode === "vacuum" ? "on" : ""} onClick={() => { setMode("vacuum"); setSeconds(0); setRunning(false); }}>
            <Tx zh="真空" en="Vacuum" />
          </button>
          <button type="button" className={mode === "air" ? "on" : ""} onClick={() => { setMode("air"); setSeconds(0); setRunning(false); }}>
            <Tx zh="有空氣" en="Air" />
          </button>
        </div>
        <button
          type="button"
          className="btn small dark"
          onClick={() => {
            setSeconds(0);
            setRunning(true);
          }}
        >
          <Tx zh="釋放" en="Release" />
        </button>
      </div>
      <div className="chamber">
        <Shaft title={lang === "zh" ? "保險箱" : "Safe"} air={mode === "air"} y={travel(safeY)}>
          <div className="safe">m</div>
        </Shaft>
        <Shaft title={lang === "zh" ? "羽毛" : "Feather"} air={mode === "air"} y={travel(featherY)}>
          <div className="feather" />
        </Shaft>
      </div>
      <div className="readouts">
        <div className="readout">
          <div className="muted">{lang === "zh" ? "保險箱進度" : "Safe"}</div>
          <b>{safeY >= 1 ? (lang === "zh" ? "已落地" : "landed") : `${Math.round(safeY * 100)}%`}</b>
        </div>
        <div className="readout">
          <div className="muted">{lang === "zh" ? "羽毛進度" : "Feather"}</div>
          <b>{featherY >= 1 ? (lang === "zh" ? "已落地" : "landed") : `${Math.round(featherY * 100)}%`}</b>
        </div>
      </div>
      <p className="muted">
        <Tx
          zh="這是定性的教室動畫。真空裡兩物同時落地；空氣只讓羽毛明顯變慢。日常經驗混進了阻力。"
          en="This is a qualitative classroom animation. In a vacuum they land together. Air slows the feather. Everyday experience mixes in drag."
        />
      </p>
      <button type="button" className="btn ghost small" onClick={() => setShowMath((value) => !value)}>
        <Tx zh="看公式如何消掉落下物體的質量" en="See how the falling mass cancels" />
      </button>
      {showMath ? (
        <>
          <Formula label="F equals G m1 m2 over r squared">
            <Var>F</Var>
            <span className="op">=</span>
            <Var>G</Var>
            <Frac n={<><Var>m</Var><sub>1</sub><Var>m</Var><sub>2</sub></>} d={<><Var>r</Var><sup>2</sup></>} />
          </Formula>
          <Formula label="F equals m1 a" light>
            <Var>F</Var>
            <span className="op">=</span>
            <Var>m</Var>
            <sub>1</sub>
            <Var>a</Var>
          </Formula>
          <Formula label="a equals G M over R squared">
            <Var>g</Var>
            <span className="op">=</span>
            <Var>a</Var>
            <span className="op">=</span>
            <Var>G</Var>
            <Frac n={<Var>M</Var>} d={<><Var>R</Var><sup>2</sup></>} />
          </Formula>
          <p>
            <Tx
              zh="兩邊都有被吸引物體的質量 m₁，所以它消掉了。g 只留下吸引體的質量 M，和到質心的距離 R。"
              en="The falling mass m₁ is on both sides, so it cancels. g keeps only the attracting mass M and the distance R to the center of mass."
            />
          </p>
        </>
      ) : null}
    </div>
  );
}

function Shaft({
  title,
  air,
  y,
  children,
}: {
  title: string;
  air: boolean;
  y: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="muted">{title}</div>
      <div className={air ? "shaft air" : "shaft"}>
        <div className="body" style={{ top: y }}>
          {children}
        </div>
        <div className="ground" />
      </div>
    </div>
  );
}
