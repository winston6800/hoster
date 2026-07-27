export const DIETARY_RESTRICTIONS = [
  {
    value: "vegetarian",
    label: "Vegetarian",
    rule: "contains no meat, poultry, or fish",
  },
  {
    value: "vegan",
    label: "Vegan",
    rule: "contains no animal products at all — no meat, fish, dairy, eggs, or honey",
  },
  {
    value: "pescatarian",
    label: "Pescatarian",
    rule: "contains no meat or poultry, but fish and seafood are fine",
  },
  {
    value: "gluten_free",
    label: "Gluten-free",
    rule: "contains no wheat, barley, rye, or regular bread/pasta/couscous",
  },
  {
    value: "dairy_free",
    label: "Dairy-free",
    rule: "contains no milk, cheese, yogurt, or butter",
  },
  {
    value: "nut_free",
    label: "Nut-free",
    rule: "contains no tree nuts or peanuts",
  },
  {
    value: "shellfish_free",
    label: "Shellfish-free",
    rule: "contains no shellfish (shrimp, crab, lobster, mussels, clams)",
  },
] as const;

export type DietaryRestrictionValue = (typeof DIETARY_RESTRICTIONS)[number]["value"];

export function restrictionRules(values: string[]): string[] {
  return DIETARY_RESTRICTIONS.filter((r) => values.includes(r.value)).map(
    (r) => r.rule,
  );
}
