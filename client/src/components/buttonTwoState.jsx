import React from 'react';
import "~/assets/styles/buttonTwoState.css";

const TwoStateBlue = ({text, func}) => {
  const changeState = (event) => {
    const checkbox = event.target;
    const label = checkbox.parentElement;

    if (checkbox.checked) {
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
  };

  return (
    <label className="input-check">
      <input
        onChange={changeState}
        type="checkbox"
        value="something"
        name="test"
        className="hidden"
      />
      {text}
    </label>
  );
};

const StatePink = ({text, func, info}) => {
  return (
    <button
      className="input-planned"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
};

const StateGrey = ({text, func, info}) => {
  return (
    <button
      className="input-full2"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
};

export { TwoStateBlue, StatePink, StateGrey };
