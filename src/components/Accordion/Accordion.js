import React, { useId, useState } from "react";

function getAccordionHeaderId(accordionId, value) {
  return accordionId + "-header-" + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + "-panel-" + value;
}

export default function AccordionItem({ sections }) {
  const [accordionId] = useId();
  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className="accordion">
      {sections.map(({ value, title, content }) => {
        const isExpanded = openSections.has(value);
        const headerId = getAccordionHeaderId(accordionId, value);
        const panelId = getAccordionPanelId(accordionId, value);
        return (
          <div className="accordion-item" key={value}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              className="accordion-item-title"
              id={headerId}
              onClick={() => {
                const newOpenSections = new Set(openSections);
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}
              type="button"
            >
              {title}{" "}
              <span
                aria-hidden={true}
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated"
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
            <div
              aria-labelledby={headerId}
              hidden={!isExpanded}
              id={panelId}
              className="accordion-item-contents"
              role="region"
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
