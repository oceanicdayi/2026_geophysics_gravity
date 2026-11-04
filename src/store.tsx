import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";
export type Phase = "predict" | "observe" | "explain";

export type StationRecord = {
  id: string;
  lesson: string;
  phase: Phase;
  choice: string;
  choiceZh: string;
  choiceEn: string;
  because: string;
  explanation: string;
  correct: boolean;
  titleZh: string;
  titleEn: string;
};

export const STATION_IDS = [
  "l1-fall",
  "l1-poles",
  "l1-walk",
  "l2-scale",
  "l2-sign",
  "l2-salt",
  "l3-copy",
  "l3-slab",
  "l3-sea",
  "lab-log",
] as const;

export type RouteId =
  | "home"
  | "l1"
  | "l2"
  | "l3"
  | "lab"
  | "glossary"
  | "notebook";

type Persisted = {
  lang: Lang;
  stations: Record<string, StationRecord>;
};

type Store = Persisted & {
  setLang: (lang: Lang) => void;
  saveStation: (record: StationRecord) => void;
  resetStation: (id: string) => void;
};

const KEY = "gravity-field-notes-v1";
const StoreContext = createContext<Store | null>(null);

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { lang: "zh", stations: {} };
    const data = JSON.parse(raw) as Persisted;
    return {
      lang: data.lang === "en" ? "en" : "zh",
      stations: data.stations && typeof data.stations === "object" ? data.stations : {},
    };
  } catch {
    return { lang: "zh", stations: {} };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
    document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  }, [state]);

  const store = useMemo<Store>(
    () => ({
      ...state,
      setLang: (lang) => setState((prev) => ({ ...prev, lang })),
      saveStation: (record) =>
        setState((prev) => ({
          ...prev,
          stations: { ...prev.stations, [record.id]: record },
        })),
      resetStation: (id) =>
        setState((prev) => {
          const stations = { ...prev.stations };
          delete stations[id];
          return { ...prev, stations };
        }),
    }),
    [state],
  );

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store missing");
  return store;
}

export function Tx({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  const { lang } = useStore();
  return <>{lang === "zh" ? zh : en}</>;
}

export function tx(lang: Lang, zh: string, en: string): string {
  return lang === "zh" ? zh : en;
}

export function parseRoute(hash: string): RouteId {
  const path = hash.replace(/^#/, "") || "/";
  if (path.startsWith("/lesson/1")) return "l1";
  if (path.startsWith("/lesson/2")) return "l2";
  if (path.startsWith("/lesson/3")) return "l3";
  if (path.startsWith("/lab")) return "lab";
  if (path.startsWith("/glossary")) return "glossary";
  if (path.startsWith("/notebook")) return "notebook";
  return "home";
}

export function useRoute(): RouteId {
  const [route, setRoute] = useState<RouteId>(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);
  return route;
}
