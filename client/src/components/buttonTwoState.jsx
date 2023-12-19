import React from 'react';

const Button2SBlue = () => {
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
      Click me
    </label>
  );
};

export default Button2SBlue;
