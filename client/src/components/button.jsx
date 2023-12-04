import React, {  memo } from "react";

const ButtonGreen = memo(({ text, func }) => {
  return (
    <button
      className="bg-grin font-montserrat font-bold text-md text-white py-2 
            px-5 rounded-lg mb-3 border-0 hover:bg-darkgrin active:bg-grin"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
});

const ButtonPink = memo(({ text, func }) => {
  return (
    <button
      className="bg-pinkk font-montserrat font-bold text-md text-white py-2 
            px-5 rounded-lg mb-3 border-0 hover:bg-darkpinkk active:bg-pinkk"
      onClick={!func ? null : func}
    >
      {text}
    </button>
  );
});

export { ButtonGreen, ButtonPink };
