import { useEffect } from "react";
import { Shell } from "./components/Shell";
import { GlossaryPage } from "./pages/GlossaryPage";
import { Home } from "./pages/Home";
import { LabPage } from "./pages/LabPage";
import { Lesson1 } from "./pages/Lesson1";
import { Lesson2 } from "./pages/Lesson2";
import { Lesson3 } from "./pages/Lesson3";
import { NotebookPage } from "./pages/NotebookPage";
import { StoreProvider, tx, useRoute, useStore } from "./store";

function Routed() {
  const route = useRoute();
  const { lang } = useStore();

  useEffect(() => {
    const titles: Record<typeof route, { zh: string; en: string }> = {
      home: { zh: "重力手記", en: "Field notes on g" },
      l1: { zh: "重力是一扇窗", en: "Gravity as a window" },
      l2: { zh: "什麼叫正常", en: "What counts as normal" },
      l3: { zh: "把山從曲線裡移開", en: "Move the hill out of the curve" },
      lab: { zh: "測站計算機", en: "Station calculator" },
      glossary: { zh: "雙語詞彙", en: "Bilingual glossary" },
      notebook: { zh: "我的手記", en: "My notes" },
    };
    document.title = `${tx(lang, titles[route].zh, titles[route].en)} · CLIL POE`;
  }, [lang, route]);

  return (
    <Shell>
      {route === "home" ? <Home /> : null}
      {route === "l1" ? <Lesson1 /> : null}
      {route === "l2" ? <Lesson2 /> : null}
      {route === "l3" ? <Lesson3 /> : null}
      {route === "lab" ? <LabPage /> : null}
      {route === "glossary" ? <GlossaryPage /> : null}
      {route === "notebook" ? <NotebookPage /> : null}
    </Shell>
  );
}

export function App() {
  return (
    <StoreProvider>
      <Routed />
    </StoreProvider>
  );
}
