import { GLOSSARY } from "../glossary";
import { Tx, useStore } from "../store";

export function VocabStrip({
  ids,
  openId,
  onToggle,
}: {
  ids: string[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  const { lang } = useStore();
  const items = ids
    .map((id) => GLOSSARY.find((entry) => entry.id === id))
    .filter((entry) => entry !== undefined);
  const open = items.find((entry) => entry.id === openId);

  return (
    <div>
      <p className="kicker">
        <Tx zh="關鍵詞　中英同時看" en="Key terms, both languages" />
      </p>
      <div className="vocab">
        {items.map((entry) => (
          <button
            key={entry.id}
            className={entry.id === openId ? "chip on" : "chip"}
            onClick={() => onToggle(entry.id)}
            aria-expanded={entry.id === openId}
          >
            <b>{entry.zh}</b>
            <span>{entry.term}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div className="vocab-open">
          <strong>
            {open.zh} · {open.term}
          </strong>
          <p>{lang === "zh" ? open.zhDef : open.enDef}</p>
          <p className="muted" style={{ color: "#d7c7b4" }}>
            {lang === "zh" ? open.enDef : open.zhDef}
          </p>
        </div>
      ) : null}
    </div>
  );
}
