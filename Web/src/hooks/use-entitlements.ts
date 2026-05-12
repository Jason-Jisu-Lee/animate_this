import { useEffect, useState } from "react";

export type Plan = "free" | "pro" | "team";

const KEY = "ma:plan";

function readPlan(): Plan {
  if (typeof window === "undefined") return "free";
  const v = window.localStorage.getItem(KEY);
  return v === "pro" || v === "team" ? v : "free";
}

export function useEntitlements() {
  const [plan, setPlanState] = useState<Plan>(readPlan);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPlanState(readPlan());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setPlan = (next: Plan) => {
    window.localStorage.setItem(KEY, next);
    setPlanState(next);
  };

  return {
    plan,
    setPlan,
    isPaid: plan !== "free",
    canExportSpec: plan !== "free",
    canSaveUnlimited: plan !== "free",
    canUseTeamWorkspace: plan === "team",
  };
}
