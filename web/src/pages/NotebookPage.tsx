import { STATION_IDS, Tx, useStore } from "../store";

const TITLES: Record<string, { zh: string; en: string; href: string }> = {
  "l1-fall": { zh: "真空裡誰先落地", en: "Who lands first", href: "#/lesson/1" },
  "l1-poles": { zh: "哪裡比較重", en: "Where g is larger", href: "#/lesson/1" },
  "l1-walk": { zh: "沿著測線", en: "Along the line", href: "#/lesson/1" },
  "l2-scale": { zh: "緯度有多大", en: "Size of latitude", href: "#/lesson/2" },
  "l2-sign": { zh: "山上要加還是要減", en: "Add or subtract on a mountain", href: "#/lesson/2" },
  "l2-salt": { zh: "平原上的負號", en: "A minus sign on a plain", href: "#/lesson/2" },
  "l3-copy": { zh: "曲線是否跟著山", en: "Does the curve follow the hill", href: "#/lesson/3" },
  "l3-slab": { zh: "高點移到哪裡", en: "Where the peak moves", href: "#/lesson/3" },
  "l3-sea": { zh: "海上的質量", en: "Mass at sea", href: "#/lesson/3" },
  "lab-log": { zh: "測站計算", en: "Station calculation", href: "#/lab" },
};

export function NotebookPage() {
  const { stations, lang } = useStore();
  const done = STATION_IDS.filter((id) => stations[id]?.phase === "explain").length;

  return (
    <article className="page lesson">
      <p className="kicker">Notebook</p>
      <h1>
        <Tx zh="我的手記" en="My notes" />
      </h1>
      <p className="lede">
        <Tx
          zh={`已完成 ${done} / 10 個測站。預測鎖在觀察之前，解釋留在這裡。`}
          en={`${done} of 10 stations are finished. Predictions stay locked before the observation. Explanations stay here.`}
        />
      </p>
      <div className="glossary-list">
        {STATION_IDS.map((id, index) => {
          const record = stations[id];
          const title = TITLES[id];
          const finished = record?.phase === "explain";
          return (
            <article key={id} className="card entry">
              <header>
                <h2>
                  {String(index + 1).padStart(2, "0")} · {lang === "zh" ? title.zh : title.en}
                </h2>
                <span className={finished ? "tag quiet" : "tag"}>
                  {finished ? <Tx zh="已解釋" en="Explained" /> : <Tx zh="未完成" en="Open" />}
                </span>
              </header>
              {record ? (
                <>
                  <p>
                    <Tx zh="預測：" en="Prediction: " />
                    {lang === "zh" ? record.choiceZh : record.choiceEn}
                    {record.phase === "explain" && !record.correct
                    ? lang === "zh"
                      ? "（和觀察不同）"
                      : " (differs from the observation)"
                    : ""}
                  </p>
                  {record.because ? <p>{record.because}</p> : null}
                  {record.explanation ? <p>{record.explanation}</p> : null}
                </>
              ) : (
                <p className="muted">
                  <Tx zh="這個測站還沒有鎖定預測。" en="No prediction has been locked yet." />
                </p>
              )}
              <a href={title.href}>
                <Tx zh="前往測站" en="Go to the station" />
              </a>
            </article>
          );
        })}
      </div>
    </article>
  );
}
