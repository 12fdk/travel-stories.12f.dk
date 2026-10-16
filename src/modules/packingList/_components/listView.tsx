import type { PackingSection } from "../../../data/packingList";

interface Props {
  sections: PackingSection[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

/**
 * The list itself.
 *
 * Real <input type="checkbox"> elements with real <label>s — not divs with
 * click handlers — so the list is keyboard-operable and screen readers announce
 * the checked state without any ARIA of our own.
 */
function ListView({ sections, checked, onToggle }: Props) {
  return (
    <div className="packing-list-columns" data-reveal-each>
      {sections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`section-${section.id}`}
          className="packing-list-section mb-6 break-inside-avoid rounded-ui bg-surface p-5 sm:p-6"
        >
          <h3
            id={`section-${section.id}`}
            className="mb-3 flex items-baseline gap-2 text-lead"
          >
            {section.title}
            <span className="text-small text-muted tabular">
              {section.items.length}
            </span>
          </h3>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {section.items.map((item) => {
              const id = `pack-${item.id}`;
              const isChecked = Boolean(checked[item.id]);
              return (
                <li key={item.id} className="m-0 p-0">
                  <label
                    htmlFor={id}
                    className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-ui px-2 py-2 transition-colors hover:bg-[var(--surface-2)]"
                  >
                    <input
                      type="checkbox"
                      id={id}
                      className="checkbox checkbox-primary checkbox-sm mt-0.5 shrink-0"
                      checked={isChecked}
                      onChange={() => onToggle(item.id)}
                    />
                    <span className="min-w-0">
                      <span
                        className={`block text-body leading-snug ${
                          isChecked ? "text-muted line-through" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.note && (
                        <span className="packing-list-note mt-0.5 block text-small leading-snug text-muted">
                          {item.note}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default ListView;
