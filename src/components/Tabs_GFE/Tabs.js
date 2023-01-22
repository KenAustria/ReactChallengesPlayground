import { useId, useState } from "react";

// declaring the function outside of scope for readability and reusability.

// generates a unique id string to use as the value of the id attribute of tab items
function getTabListItemId(tabsId, value) {
  return tabsId + "-tab-" + value;
}

// generates unique id string to use as value of the id attribute of tabpanels
function getTabPanelId(tabsId, value) {
  return tabsId + "-tabpanel-" + value;
}

export default function Tabs({ defaultValue, items }) {
  // generate unique id
  const [tabsId] = useId();
  // if defaultValue isn't provided, use first item as value
  const [tabValue, setTabValue] = useState(defaultValue ?? items[0].value);

  function keyDownReducer(event) {
    switch (event.code) {
      case "ArrowLeft": {
        const index = items.findIndex(
          ({ tabValue: itemValue }) => tabValue === itemValue
        );
        setValueViaIndex(
          // Use modulo to wrap around to the end if necessary.
          (index - 1 + items.length) % items.length
        );
        break;
      }
      case "ArrowRight": {
        const index = items.findIndex(
          ({ tabValue: itemValue }) => tabValue === itemValue
        );
        // Use modulo to wrap around to the start if necessary.
        setValueViaIndex((index + 1) % items.length);
        break;
      }
      case "Home": {
        // Set the first item ias the active item.
        setValueViaIndex(0);
        break;
      }
      case "End": {
        // Set the last item ias the active item.
        setValueViaIndex(items.length - 1);
        break;
      }
      default:
        break;
    }
  }

  function setValueViaIndex(index) {
    const newTabValue = items[index].value;
    setTabValue(newTabValue);
    // bring new tab to come into focus by using its id
    document.getElementById(getTabListItemId(tabsId, newTabValue)).focus();
  }

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" onKeyDown={keyDownReducer}>
        {items.map(({ value: itemValue, label }) => {
          // if tabValue state matches value key, then that's the active tab
          const isActiveValue = itemValue === tabValue;
          return (
            <button
              type="button"
              role="tab"
              key={itemValue}
              id={getTabListItemId(tabsId, itemValue)}
              // tabs-list-item style is always applied
              // if isActiveValue is truthy, also apply tabs-list-item--active styles
              // elements that pass null check are passed to new array
              // then join to create "tabs-list-item tabs-list-item--active"
              className={[
                "tabs-list-item",
                isActiveValue && "tabs-list-item--active"
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setTabValue(itemValue)}
              // identifies element whose contents are controlled by element this attribute is set
              aria-controls={getTabPanelId(tabsId, itemValue)}
              // indicates current selected state
              aria-selected={isActiveValue}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ value: itemValue, panel }) => {
          return (
            <div
              role="tabpanel"
              key={itemValue}
              id={getTabPanelId(tabsId, itemValue)}
              //  identifies element that labels the element it is applied to
              aria-labelledby={getTabListItemId(tabsId, itemValue)}
              hidden={itemValue !== tabValue}
            >
              {panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
