import { focusStackColor, focusLabel } from "@/lib/health-focus";

type StackItem = {
  id: string;
  title: string;
  health_focus: string;
};

export default function StackTower({
  items,
  highlightId,
}: {
  items: StackItem[];
  highlightId?: string;
}) {
  if (items.length === 0) return null;

  // Deterministic little left/right lean per block so the tower doesn't
  // look like a rigid, machine-stacked column.
  const wobbleFor = (index: number) => `${Math.sin(index * 2.4) * 5}px`;

  return (
    <div className="stack-tower" role="img" aria-label={`A stack of ${items.length} meals`}>
      {items.map((item, index) => {
        const color = focusStackColor(item.health_focus);
        const isTop = item.id === highlightId;
        return (
          <div
            key={item.id}
            className="stack-block-wrap"
            title={`${item.title} — ${focusLabel(item.health_focus)}`}
          >
            <div
              className={`stack-drop ${isTop ? "stack-block-new" : ""}`}
              style={{ "--wobble": wobbleFor(index) } as React.CSSProperties}
            >
              <div className="stack-block">
                <div className="stack-face front" style={{ background: color }} />
                <div className="stack-face right" style={{ background: color }} />
                <div className="stack-face top" style={{ background: color }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
