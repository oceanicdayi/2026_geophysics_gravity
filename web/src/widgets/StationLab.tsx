import { useMemo, useState } from "react";
import {
  anomaliesFromObservation,
  classifyAnomaly,
  formatMgal,
  freeAirDominates,
  observationFromBouguer,
  type StationMode,
} from "../physics";
import { Tx, tx, useStore, type StationRecord } from "../store";

type Preset = {
  id: string;
  zh: string;
  en: string;
  phi: number;
  height: number;
  density: number;
  mode: StationMode;
  waterDepth: number;
  boug: number;
  noteZh: string;
  noteEn: string;
};

const PRESETS: Preset[] = [
  {
    id: "plain",
    zh: "平原",
    en: "Plain",
    phi: 23.5,
    height: 20,
    density: 2.67,
    mode: "land",
    waterDepth: 0,
    boug: 0.3,
    noteZh: "高程很小，布格異常也接近零。",
    noteEn: "Elevation is small and the Bouguer anomaly is near zero.",
  },
  {
    id: "ridge",
    zh: "高山量級",
    en: "High ridge",
    phi: 23.5,
    height: 3952,
    density: 2.67,
    mode: "land",
    waterDepth: 0,
    boug: -45,
    noteZh: "海拔用 3,952 m 這個熟悉的量級。−45 mGal 是合成值，用來練習校正，不是玉山實測。",
    noteEn: "Elevation uses the familiar 3,952 m scale. The −45 mGal is synthetic practice, not a Yushan survey.",
  },
  {
    id: "ore",
    zh: "高密度目標",
    en: "Dense target",
    phi: 25,
    height: 80,
    density: 2.67,
    mode: "land",
    waterDepth: 0,
    boug: 12,
    noteZh: "平原上的正布格異常，留給高密度體。",
    noteEn: "A positive Bouguer anomaly on a plain, left for a dense body.",
  },
  {
    id: "salt",
    zh: "低密度目標",
    en: "Light target",
    phi: 24,
    height: 40,
    density: 2.67,
    mode: "land",
    waterDepth: 0,
    boug: -14,
    noteZh: "負異常可以是鹽丘、盆地或空洞。這裡不替你選定一種。",
    noteEn: "A negative anomaly can be a salt dome, a basin, or a cavity. This station does not choose for you.",
  },
  {
    id: "sea",
    zh: "海上",
    en: "Marine",
    phi: 20,
    height: 0,
    density: 2.67,
    mode: "sea",
    waterDepth: 2800,
    boug: 5,
    noteZh: "自由空間異常會很負，因為海水比岩石輕。補上海水虧損後，布格異常只剩一點正值。",
    noteEn: "The free-air anomaly is largely negative because seawater is lighter than rock. After the water deficit is restored, only a small positive Bouguer anomaly remains.",
  },
];

export function StationLab() {
  const store = useStore();
  const [phi, setPhi] = useState(23.5);
  const [height, setHeight] = useState(20);
  const [density, setDensity] = useState(2.67);
  const [mode, setMode] = useState<StationMode>("land");
  const [waterDepth, setWaterDepth] = useState(0);
  const [gObs, setGObs] = useState(() =>
    observationFromBouguer({
      boug: 0.3,
      phiDeg: 23.5,
      height: 20,
      density: 2.67,
      mode: "land",
      waterDepth: 0,
    }),
  );
  const [noteZh, setNoteZh] = useState(PRESETS[0].noteZh);
  const [noteEn, setNoteEn] = useState(PRESETS[0].noteEn);
  const [savedText, setSavedText] = useState("");

  const parts = useMemo(
    () => anomaliesFromObservation({ gObs, phiDeg: phi, height, density, mode, waterDepth }),
    [gObs, phi, height, density, mode, waterDepth],
  );
  const kind = classifyAnomaly(parts.boug);
  const dominated = freeAirDominates(parts.fa, parts.boug);
  const oddUnit = gObs > 0 && gObs < 100;

  function apply(preset: Preset) {
    setPhi(preset.phi);
    setHeight(preset.height);
    setDensity(preset.density);
    setMode(preset.mode);
    setWaterDepth(preset.waterDepth);
    setGObs(
      observationFromBouguer({
        boug: preset.boug,
        phiDeg: preset.phi,
        height: preset.height,
        density: preset.density,
        mode: preset.mode,
        waterDepth: preset.waterDepth,
      }),
    );
    setNoteZh(preset.noteZh);
    setNoteEn(preset.noteEn);
  }

  function save() {
    const summaryZh = `緯度 ${phi}°、高程 ${height} m，模式 ${mode === "land" ? "陸地" : "海上"}。自由空間異常 ${formatMgal(parts.fa, 2)} mGal，布格異常 ${formatMgal(parts.boug, 2)} mGal。`;
    const summaryEn = `Latitude ${phi}°, elevation ${height} m, ${mode} mode. Free-air anomaly ${formatMgal(parts.fa, 2)} mGal, Bouguer anomaly ${formatMgal(parts.boug, 2)} mGal.`;
    const record: StationRecord = {
      id: "lab-log",
      lesson: "lab",
      phase: "explain",
      choice: mode,
      choiceZh: mode === "land" ? "陸地測站" : "海上測站",
      choiceEn: mode === "land" ? "Land station" : "Marine station",
      because: store.lang === "zh" ? noteZh : noteEn,
      explanation: savedText || (store.lang === "zh" ? summaryZh : summaryEn),
      correct: true,
      titleZh: "測站計算",
      titleEn: "Station calculation",
    };
    store.saveStation(record);
  }

  return (
    <div className="widget">
      <div className="presets">
        {PRESETS.map((preset) => (
          <button key={preset.id} type="button" className="btn small ghost" onClick={() => apply(preset)}>
            <Tx zh={preset.zh} en={preset.en} />
          </button>
        ))}
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="phi">
            <Tx zh="緯度 φ（度）" en="Latitude φ (degrees)" />
          </label>
          <input id="phi" type="number" min={0} max={90} step={0.1} value={phi} onChange={(event) => setPhi(clamp(event.target.value, 0, 90))} />
        </div>
        <div className="field">
          <label htmlFor="height">
            <Tx zh="測站高程 h（公尺）" en="Station elevation h (metres)" />
          </label>
          <input id="height" type="number" min={0} step={1} value={height} onChange={(event) => setHeight(Math.max(0, Number(event.target.value) || 0))} />
        </div>
        <div className="field">
          <label htmlFor="gobs">
            <Tx zh="觀測重力 g（mGal）" en="Observed g (mGal)" />
          </label>
          <input id="gobs" type="number" step={0.01} value={Number(gObs.toFixed(2))} onChange={(event) => setGObs(Number(event.target.value) || 0)} />
        </div>
        <div className="field">
          <label htmlFor="mode">
            <Tx zh="測站類型" en="Station type" />
          </label>
          <select id="mode" value={mode} onChange={(event) => setMode(event.target.value as StationMode)}>
            <option value="land">{tx(store.lang, "陸地", "Land")}</option>
            <option value="sea">{tx(store.lang, "海上", "Sea")}</option>
          </select>
        </div>
        {mode === "land" ? (
          <div className="field">
            <label htmlFor="rho">
              <Tx zh="平板密度 ρ（g/cm³）" en="Slab density ρ (g/cm³)" />
            </label>
            <input id="rho" type="number" min={1} max={4} step={0.01} value={density} onChange={(event) => setDensity(clamp(event.target.value, 1, 4))} />
          </div>
        ) : (
          <div className="field">
            <label htmlFor="hw">
              <Tx zh="水深（公尺）" en="Water depth (metres)" />
            </label>
            <input id="hw" type="number" min={0} step={10} value={waterDepth} onChange={(event) => setWaterDepth(Math.max(0, Number(event.target.value) || 0))} />
          </div>
        )}
      </div>
      {oddUnit ? (
        <p className="warn">
          <Tx
            zh="這個數字若是 9.8 左右，單位可能是 m/s²。本站使用 mGal，地球表面大約是 980,000。"
            en="A number near 9.8 may be in m/s². This station uses mGal. Earth’s surface is near 980,000."
          />
        </p>
      ) : null}
      <div className="grid-2" style={{ marginTop: "0.9rem" }}>
        <div>
          <p className="kicker">
            <Tx zh="簡單布格，地形校正設為 0" en="Simple Bouguer, terrain correction set to 0" />
          </p>
          <div className="chain">
            <div><span>g</span><span>{formatMgal(gObs, 2)}</span></div>
            <div><span>gₜ</span><span>{formatMgal(parts.gt, 2)}</span></div>
            <div><span>FAC</span><span>{formatMgal(parts.fac, 2)}</span></div>
            <div><span>{mode === "sea" ? "BCₛ" : "BC"}</span><span>{formatMgal(parts.bc, 2)}</span></div>
            <div><span>Δg_fa = g − gₜ + FAC</span><span>{formatMgal(parts.fa, 2)}</span></div>
            <div className="result"><span>Δg_B = Δg_fa − BC</span><span>{formatMgal(parts.boug, 2)} mGal</span></div>
          </div>
        </div>
        <div>
          <p>
            <span className={`tag ${kind}`}>
              {kind === "high" ? <Tx zh="正異常 · 質量過剩" en="Positive · mass excess" /> : null}
              {kind === "low" ? <Tx zh="負異常 · 質量虧損" en="Negative · mass deficit" /> : null}
              {kind === "quiet" ? <Tx zh="接近參考模型" en="Close to the reference" /> : null}
            </span>
          </p>
          <p>
            <Tx zh={noteZh} en={noteEn} />
          </p>
          {dominated ? (
            <p>
              <Tx
                zh="自由空間異常的幅度明顯大於布格異常。緯度和高程之外，還有一大塊質量（山的岩石，或海上的海水虧損）留在自由空間異常裡。"
                en="The free-air anomaly is much larger than the Bouguer anomaly. Beyond latitude and elevation, a large mass term — the rock of the hill, or the seawater deficit — is still inside the free-air number."
              />
            </p>
          ) : null}
          <p className="muted">
            <Tx
              zh="同一條曲線可以對應不只一種地下形狀。把異常說成「一定是鐵礦」或「一定是洞穴」，超過了重力自己能保證的範圍。"
              en="One curve can belong to more than one underground shape. Calling it “certainly iron ore” or “certainly a cave” goes beyond what gravity can guarantee."
            />
          </p>
        </div>
      </div>
      <label className="write">
        <span>
          <Tx zh="寫進手記：這個測站你要怎麼向同學解釋？" en="Field note: how would you explain this station to a classmate?" />
        </span>
        <textarea
          value={savedText}
          onChange={(event) => setSavedText(event.target.value)}
          placeholder={tx(
            store.lang,
            "自由空間異常是____，因為____。布格異常是____，我把它讀成____。",
            "The free-air anomaly is ____ because ____. The Bouguer anomaly is ____, which I read as ____.",
          )}
        />
      </label>
      <button type="button" className="btn primary" onClick={save}>
        <Tx zh="寫進手記" en="Save to the notebook" />
      </button>
    </div>
  );
}

function clamp(raw: string, min: number, max: number): number {
  const value = Number(raw);
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}
