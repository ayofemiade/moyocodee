"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { PainId } from "@/content/home";

type PainState = {
  picked: PainId[];
  toggle: (id: PainId) => void;
  isPicked: (id: PainId) => boolean;
};

const PainContext = createContext<PainState | null>(null);

/** Shares the visitor's chosen problems between the hero, the problems section and the form. */
export function PainProvider({ children }: { children: React.ReactNode }) {
  const [picked, setPicked] = useState<PainId[]>([]);
  const toggle = useCallback(
    (id: PainId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    [],
  );
  const value = useMemo(() => ({ picked, toggle, isPicked: (id: PainId) => picked.includes(id) }), [picked, toggle]);
  return <PainContext.Provider value={value}>{children}</PainContext.Provider>;
}

/** Returns null outside a PainProvider, so components still work on pages without it. */
export function usePains() {
  return useContext(PainContext);
}
