import React, { useState } from "react";
import "~/assets/styles/buttonTwoState.css";

const TwoStateBlue = ({ text, func }) => {
  const [isChecked, setIsChecked] = useState(false);

  const changeState = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  return (
    <label className={`input-check ${isChecked ? 'checked' : ''}`}>
      <input
        onChange={changeState}
        type="checkbox"
        value="something"
        name="test"
        className="hidden"
        checked={isChecked}
      />
      {text}
    </label>
  );
};

const TwoStateBorder = ({ text, func }) => {
  const changeState = (event) => {
    const checkbox = event.target;
    const label = checkbox.parentElement;

    if (checkbox.checked) {
      label.classList.remove('checked');
    } else {
      label.classList.add('checked');
    }
  };

  return (
    <label className="input-check checked">
      <input
        onChange={changeState}
        type="checkbox"
        value="something"
        name="test"
        className="hidden"
        // defaultChecked  // Thêm thuộc tính defaultChecked để đặt giá trị mặc định là checked
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

const ButtonBlue = ({text, func, info}) => {
  return (
    <button
      className="btn-blue"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
};

const ButtonGrey = ({text, func, info}) => {
  return (
    <button
      className="btn-grey"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
};

const ButtonPink = ({text, func, info}) => {
  return (
    <button
      className="btn-pink"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
};

export { TwoStateBlue, StatePink, StateGrey, TwoStateBorder, ButtonBlue, ButtonGrey, ButtonPink };