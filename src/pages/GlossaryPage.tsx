import { useMemo, useState } from "react";
import { GLOSSARY, GROUPS } from "../glossary";
import { Tx, tx, useStore } from "../store";

export function GlossaryPage() {
  const { lang } = useStore();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("all");

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return GLOSSARY.filter((entry) => {
      if (group !== "all" && entry.group !== group) return false;
      if (!needle) return true;
      return [entry.term, entry.zh, entry.en, entry.zhDef, entry.enDef].join(" ").toLowerCase().includes(needle);
    });
  }, [group, query]);

  return (
    <article className="page lesson">
      <p className="kicker">Glossary</p>
      <h1>
        <Tx zh="雙語詞彙" en="Bilingual glossary" />
      </h1>
      <p className="lede">
        <Tx
          zh="每個詞都留下中文、英文和它在這門課裡的用法。搜尋時中英文都可以。"
          en="Each word keeps its Chinese, its English, and the way this course uses it. Search in either language."
        />
      </p>
      <input
        className="search"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={tx(lang, "搜尋，例如 布格 或 free-air", "Search, for example 布格 or free-air")}
        aria-label={tx(lang, "搜尋詞彙", "Search glossary")}
      />
      <div className="presets">
        <button type="button" className={group === "all" ? "btn small dark" : "btn small ghost"} onClick={() => setGroup("all")}>
          <Tx zh="全部" en="All" />
        </button>
        {GROUPS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={group === item.id ? "btn small dark" : "btn small ghost"}
            onClick={() => setGroup(item.id)}
          >
            <Tx zh={item.zh} en={item.en} />
          </button>
        ))}
      </div>
      <div className="glossary-list">
        {items.map((entry) => (
          <article key={entry.id} className="card entry">
            <header>
              <h2>
                {entry.zh}
                <span className="muted"> · {entry.term}</span>
              </h2>
              <span className="pos">{lang === "zh" ? entry.pos.zh : entry.pos.en}</span>
            </header>
            <p>{lang === "zh" ? entry.zhDef : entry.enDef}</p>
            <p className="muted">{lang === "zh" ? entry.enDef : entry.zhDef}</p>
          </article>
        ))}
        {items.length === 0 ? (
          <p>
            <Tx zh="沒有對上的詞。" en="No term matched." />
          </p>
        ) : null}
      </div>
    </article>
  );
}
