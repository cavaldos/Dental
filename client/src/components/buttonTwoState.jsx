import { message } from "antd";
import React, { useState } from "react";
import "~/assets/styles/buttonTwoState.css";
import { dangkiLichRanh } from "~/redux/features/dkLichRanhNsSlice";
import { useDispatch, useSelector } from "react-redux";

function convertDateFormat(dateString) {
  var dateParts = dateString.split("/");
  var day = parseInt(dateParts[0]);
  var month = parseInt(dateParts[1]);
  var year = parseInt(dateParts[2]);
  var date = new Date(year, month - 1, day);

  var convertedDay = date.getDate().toString().padStart(2, "0");
  var convertedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  var convertedYear = date.getFullYear().toString();
  var convertedDateString =
    convertedYear + "-" + convertedMonth + "-" + convertedDay;

  return convertedDateString;
}

const TwoStateBlue = ({ text, func, maca, ngay }) => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const changeState = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  const dangky = useSelector((state) => state.dangky);
  const newkey = dangky.maca + dangky.ngay;
  let color = "";
  if (newkey === maca + convertDateFormat(ngay)) {
    color = "checked";
  }
  const handleOnClick = () => {
    dispatch(
      dangkiLichRanh({ mans: 1, maca: maca, ngay: convertDateFormat(ngay) })
    );
    message.info(`Đa chon thành công ca ${maca} ngày ${ngay}`);
  };
  return (
    <label className={`input-check ${color} `}>
      <input
        onChange={changeState}
        onClick={handleOnClick}
        type="checkbox"
        value="something"
        name="test"
        className="hidden"
        checked={isChecked}
      />
      {text}jjjj
    </label>
  );
};

const TwoStateBorder = ({ text, func }) => {
  const changeState = (event) => {
    const checkbox = event.target;
    const label = checkbox.parentElement;

    if (checkbox.checked) {
      label.classList.remove("checked");
    } else {
      label.classList.add("checked");
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

const StatePink = ({ text, func, info }) => {
  return (
    <button className="input-planned" onClick={!func ? null : func}>
      {text}
    </button>
  );
};

const StateGrey = ({ text, func, info }) => {
  return (
    <button className="input-full2" onClick={!func ? null : func}>
      {text}
    </button>
  );
};

const ButtonBlue = ({ text, func, info }) => {
  return (
    <button className="btn-blue" onClick={!func ? null : func}>
      {text}
    </button>
  );
};

const ButtonGrey = ({ text, func, info }) => {
  return (
    <button className="btn-grey" onClick={!func ? null : func}>
      {text}
    </button>
  );
};

const ButtonPink = ({ text, func, info }) => {
  return (
    <button className="btn-pink" onClick={!func ? null : func}>
      {text}
    </button>
  );
};

export {
  TwoStateBlue,
  StatePink,
  StateGrey,
  TwoStateBorder,
  ButtonBlue,
  ButtonGrey,
  ButtonPink,
};
