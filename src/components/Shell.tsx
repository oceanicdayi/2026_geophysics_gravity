import type { ReactNode } from "react";
import { STATION_IDS, Tx, useRoute, useStore, type RouteId } from "../store";

const LINKS: { id: RouteId; href: string; zh: string; en: string }[] = [
  { id: "home", href: "#/", zh: "課程", en: "Course" },
  { id: "l1", href: "#/lesson/1", zh: "重力窗", en: "Window" },
  { id: "l2", href: "#/lesson/2", zh: "自由空間", en: "Free-air" },
  { id: "l3", href: "#/lesson/3", zh: "布格", en: "Bouguer" },
  { id: "lab", href: "#/lab", zh: "測站", en: "Station" },
  { id: "glossary", href: "#/glossary", zh: "詞彙", en: "Glossary" },
  { id: "notebook", href: "#/notebook", zh: "手記", en: "Notes" },
];

export function Shell({ children }: { children: ReactNode }) {
  const route = useRoute();
  const { lang, setLang, stations } = useStore();
  const done = STATION_IDS.filter((id) => stations[id]?.phase === "explain").length;

  return (
    <>
      <a className="skip" href="#content">
        <Tx zh="跳到內容" en="Skip to content" />
      </a>
      <header className="nav">
        <a className="brand" href="#/">
          <span className="brand-mark">g</span>
          <span>
            <strong>
              <Tx zh="重力手記" en="Field notes on g" />
            </strong>
            <small>CLIL · POE</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="primary">
          {LINKS.map((link) => (
            <a key={link.id} href={link.href} aria-current={route === link.id ? "page" : undefined}>
              <Tx zh={link.zh} en={link.en} />
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <span className="pill" title={lang === "zh" ? "已完成的 POE 測站" : "Finished POE stations"}>
            {done}/10
          </span>
          <div className="lang" role="group" aria-label={lang === "zh" ? "語言" : "Language"}>
            <button type="button" className={lang === "zh" ? "on" : ""} onClick={() => setLang("zh")}>
              中文
            </button>
            <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
      </header>
      <main id="content">{children}</main>
      <footer className="footer">
        <div className="wrap">
          <p>
            <Tx
              zh="公式採用課程中的 1967 國際重力公式、自由空間梯度 0.308 mGal/m，以及布格平板 0.0419 ρ h。剖面、動畫和預設測站都是教學模型，不是野外實測。"
              en="The formulas follow the course: the 1967 International Gravity Formula, a free-air gradient of 0.308 mGal/m, and a Bouguer slab of 0.0419 ρ h. Profiles, animations, and preset stations are teaching models, not field surveys."
            />
          </p>
          <p>
            <Tx zh="課程原文：" en="Course notes: " />
            <a href="https://oceanicdayi.blogspot.com/2025/10/1015-1.html" target="_blank" rel="noreferrer">
              <Tx zh="重力探勘" en="Prospecting" />
            </a>
            {" · "}
            <a href="https://oceanicdayi.blogspot.com/2025/10/1015-2.html" target="_blank" rel="noreferrer">
              <Tx zh="自由空間" en="Free-air" />
            </a>
            {" · "}
            <a href="https://oceanicdayi.blogspot.com/2025/10/1015-3.html" target="_blank" rel="noreferrer">
              <Tx zh="布格" en="Bouguer" />
            </a>
            {" · "}
            <a href="https://huggingface.co/spaces/cwadayi/Gravity" target="_blank" rel="noreferrer">
              Gravity Space
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
