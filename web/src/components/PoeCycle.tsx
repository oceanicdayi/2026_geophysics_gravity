import { useState, type ReactNode } from "react";
import { Tx, tx, useStore, type Phase, type StationRecord } from "../store";

const LETTERS = ["A", "B", "C", "D", "E"];

export type PoeOption = { id: string; zh: string; en: string };

export function PoeCycle({
  id,
  lesson,
  index,
  title,
  question,
  options,
  correct,
  children,
  explanation,
  model,
  predictFrame,
  explainFrame,
}: {
  id: string;
  lesson: string;
  index: string;
  title: { zh: string; en: string };
  question: { zh: string; en: string };
  options: PoeOption[];
  correct: string;
  children: ReactNode;
  explanation: ReactNode;
  model: { zh: string; en: string };
  predictFrame: { zh: string; en: string };
  explainFrame: { zh: string; en: string };
}) {
  const store = useStore();
  const saved = store.stations[id];
  const phase: Phase = saved?.phase ?? "predict";
  const [choice, setChoice] = useState(saved?.choice ?? "");
  const [because, setBecause] = useState(saved?.because ?? "");
  const [written, setWritten] = useState(saved?.explanation ?? "");
  const [showModel, setShowModel] = useState(false);

  function lock() {
    const selected = options.find((option) => option.id === choice);
    if (!selected) return;
    const record: StationRecord = {
      id,
      lesson,
      phase: "observe",
      choice,
      choiceZh: selected.zh,
      choiceEn: selected.en,
      because,
      explanation: written,
      correct: choice === correct,
      titleZh: title.zh,
      titleEn: title.en,
    };
    store.saveStation(record);
  }

  function finishObserve() {
    if (!saved) return;
    store.saveStation({ ...saved, phase: "explain", explanation: written });
  }

  function write(text: string) {
    setWritten(text);
    if (saved) store.saveStation({ ...saved, explanation: text });
  }

  const phaseLabel = (name: Phase, text: string) => {
    const rank = { predict: 0, observe: 1, explain: 2 };
    const current = rank[phase];
    const mine = rank[name];
    const cls = mine === current ? "on" : mine < current ? "done" : "";
    return <span className={cls}>{text}</span>;
  };

  return (
    <section className="poe" id={id} aria-labelledby={`${id}-title`}>
      <div className="poe-head">
        <div className="rail" aria-hidden="true">
          {phaseLabel("predict", "P · 預測")}
          {phaseLabel("observe", "O · 觀察")}
          {phaseLabel("explain", "E · 解釋")}
        </div>
        <div>
          <p className="kicker">
            <Tx zh={`測站 ${index}`} en={`Station ${index}`} />
            {" · POE"}
          </p>
          <h2 id={`${id}-title`}>
            <Tx zh={title.zh} en={title.en} />
          </h2>
        </div>
      </div>

      <p className="question">
        <Tx zh={question.zh} en={question.en} />
      </p>

      {phase === "predict" ? (
        <>
          <div className="options" role="radiogroup" aria-label={tx(store.lang, title.zh, title.en)}>
            {options.map((option, indexOption) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={choice === option.id}
                className={choice === option.id ? "option selected" : "option"}
                onClick={() => setChoice(option.id)}
              >
                <span className="letter">{LETTERS[indexOption]}</span>
                <span>
                  <Tx zh={option.zh} en={option.en} />
                </span>
              </button>
            ))}
          </div>
          <label className="because">
            <span>
              <Tx zh="因為……（先寫下來，鎖定後不能改預測）" en="Because… (locked with the prediction)" />
            </span>
            <textarea
              value={because}
              onChange={(event) => setBecause(event.target.value)}
              placeholder={tx(store.lang, predictFrame.zh, predictFrame.en)}
            />
          </label>
          <p className="frame">
            <Tx zh={predictFrame.zh} en={predictFrame.en} />
          </p>
          <div className="row-actions">
            <button type="button" className="btn primary" disabled={!choice} onClick={lock}>
              <Tx zh="鎖定預測，開始觀察" en="Lock the prediction and observe" />
            </button>
          </div>
        </>
      ) : (
        <aside className="slip">
          <span className="kicker">
            <Tx zh="預測已鎖定" en="Prediction locked" />
          </span>
          <strong>
            <Tx zh={saved?.choiceZh ?? ""} en={saved?.choiceEn ?? ""} />
          </strong>
          {saved?.because ? <p>{saved.because}</p> : null}
        </aside>
      )}

      {phase !== "predict" ? (
        <div className="observe">
          <h3>
            <Tx zh="觀察" en="Observe" />
          </h3>
          {children}
          {phase === "observe" ? (
            <div className="row-actions">
              <button type="button" className="btn dark" onClick={finishObserve}>
                <Tx zh="觀察完成，進入解釋" en="I have observed this. Explain it." />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {phase === "explain" && saved ? (
        <div className="explain">
          <div className={saved.correct ? "banner ok" : "banner revise"}>
            {saved.correct ? (
              <Tx
                zh="預測和觀察站在同一邊。接下來把機制說清楚。"
                en="The prediction and the observation agree. Now say what mechanism makes that true."
              />
            ) : (
              <Tx
                zh="觀察和預測不一樣。先相信讀數，再改模型。這個落差就是 POE 要留下的東西。"
                en="The observation disagrees with the prediction. Keep the reading, and revise the model. That gap is the point of POE."
              />
            )}
          </div>
          <div className="explain-body">{explanation}</div>
          <label className="write">
            <span>
              <Tx zh="用你自己的話寫一次解釋" en="Write the explanation in your own words" />
            </span>
            <textarea
              value={written}
              onChange={(event) => write(event.target.value)}
              placeholder={tx(store.lang, explainFrame.zh, explainFrame.en)}
            />
          </label>
          <p className="frame">
            <Tx zh={explainFrame.zh} en={explainFrame.en} />
          </p>
          <div className="row-actions">
            <button type="button" className="btn ghost small" onClick={() => setShowModel((value) => !value)}>
              {showModel ? (
                <Tx zh="收起參考解釋" en="Hide the model answer" />
              ) : (
                <Tx zh="對照參考解釋" en="Compare with a model answer" />
              )}
            </button>
            <button
              type="button"
              className="linkish"
              onClick={() => {
                store.resetStation(id);
                setChoice("");
                setBecause("");
                setWritten("");
                setShowModel(false);
              }}
            >
              <Tx zh="重做這個測站" en="Reset this station" />
            </button>
          </div>
          {showModel ? (
            <>
              <div className="model">
                <p className="kicker">中文</p>
                <p>{model.zh}</p>
              </div>
              <div className="model">
                <p className="kicker">English</p>
                <p>{model.en}</p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
