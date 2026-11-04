import type { ReactNode } from "react";
import { Tx, useStore } from "../store";

export function Formula({
  children,
  light = false,
  label,
}: {
  children: ReactNode;
  light?: boolean;
  label: string;
}) {
  return (
    <div className={light ? "formula light" : "formula"} role="math" aria-label={label}>
      {children}
    </div>
  );
}

export function Frac({ n, d }: { n: ReactNode; d: ReactNode }) {
  return (
    <span className="frac">
      <span>{n}</span>
      <span>{d}</span>
    </span>
  );
}

export function Var({ children }: { children: ReactNode }) {
  return <span className="var">{children}</span>;
}

export function Callout({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <aside className="callout">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Objectives({
  content,
  language,
}: {
  content: { zh: string[]; en: string[] };
  language: { zh: string[]; en: string[] };
}) {
  const { lang } = useStore();
  const contentItems = lang === "zh" ? content.zh : content.en;
  const languageItems = lang === "zh" ? language.zh : language.en;
  return (
    <div className="objectives">
      <section className="objective">
        <p className="kicker">Content</p>
        <h3>
          <Tx zh="學科目標" en="Content goal" />
        </h3>
        <ul>
          {contentItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="objective">
        <p className="kicker">Communication</p>
        <h3>
          <Tx zh="語言目標" en="Language goal" />
        </h3>
        <ul>
          {languageItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function NextBar({
  prev,
  next,
}: {
  prev?: { href: string; zh: string; en: string };
  next?: { href: string; zh: string; en: string };
}) {
  return (
    <nav className="nextbar" aria-label="lesson">
      {prev ? (
        <a className="btn ghost" href={prev.href}>
          ← <Tx zh={prev.zh} en={prev.en} />
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a className="btn dark" href={next.href}>
          <Tx zh={next.zh} en={next.en} /> →
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
