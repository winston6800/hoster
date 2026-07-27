export const HEALTH_FOCUSES = [
  {
    value: "general_wellness",
    label: "General wellness",
    guidance:
      "a balanced Mediterranean plate: olive oil, vegetables, whole grains, lean protein, in ordinary portions",
    stackColor: "#5c7a3f",
  },
  {
    value: "heart_health",
    label: "Heart health",
    guidance:
      "heart-healthy Mediterranean choices: emphasize olive oil, fatty fish, nuts, and vegetables; keep sodium and saturated fat low; avoid processed/cured meats",
    stackColor: "#c1503f",
  },
  {
    value: "weight_management",
    label: "Weight management",
    guidance:
      "a filling but calorie-conscious Mediterranean meal: high fiber and protein for satiety, generous vegetables, modest portions of grains and added fat",
    stackColor: "#d9a441",
  },
  {
    value: "more_protein",
    label: "More protein",
    guidance:
      "a higher-protein Mediterranean meal: lean fish, legumes, eggs, or lean poultry as the anchor, still built around olive oil, vegetables, and whole grains",
    stackColor: "#3f6b52",
  },
  {
    value: "blood_sugar_friendly",
    label: "Blood sugar friendly",
    guidance:
      "a lower-glycemic Mediterranean meal: whole grains or legumes instead of refined carbs, pair carbs with protein/fat/fiber, avoid added sugar",
    stackColor: "#6b4a63",
  },
] as const;

export type HealthFocusValue = (typeof HEALTH_FOCUSES)[number]["value"];

export function focusLabel(value: string): string {
  return HEALTH_FOCUSES.find((f) => f.value === value)?.label ?? value;
}

export function focusGuidance(value: string): string {
  return (
    HEALTH_FOCUSES.find((f) => f.value === value)?.guidance ??
    HEALTH_FOCUSES[0].guidance
  );
}

export function focusStackColor(value: string): string {
  return (
    HEALTH_FOCUSES.find((f) => f.value === value)?.stackColor ??
    HEALTH_FOCUSES[0].stackColor
  );
}
