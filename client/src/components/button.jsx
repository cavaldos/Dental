import React, { useState } from "react";

const ButtonGreen = ({ text, modal }) => {
return (
    <button className="bg-green-600 font-montserrat font-bold text-xs text-white py-2 
        px-5 rounded-lg mb-4 hover:bg-green-700 active:bg-green-600" onClick={modal}>
    {text}
    </button>
);
};

export default ButtonGreen;