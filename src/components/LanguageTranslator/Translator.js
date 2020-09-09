import React, { useState } from "react";
import PropTypes from "prop-types";

const Translator = props => {
  const [input, setInput] = useState("");

  return (
    <>
      <div>
        <span>input:</span>
        <input
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
      </div>
      <div>
        <span>output:</span>
        <input
          type="text"
          value={props.translations.get(input) || ""}
          readOnly
        />
      </div>
    </>
  );
};

Translator.propTypes = {
  translations: PropTypes.array
};

export default Translator;

// const TRANSLATIONS = new Map([
// 	["ball", "pelota"],
// 	["house", "casa"],
// 	["dog", "perro"],
// 	["dogs", "perros"],
// 	["milk", "leche"],
// 	["orange", "naranja"]
// ]);

// <LanguageTranslator translations={TRANSLATIONS} />