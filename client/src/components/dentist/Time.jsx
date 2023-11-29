import { Button } from "antd";

const Time = ({ time, status }) => {
    switch (status) {
    case "full":
      return <Button disabled>{time}</Button>;
    case "empty":
      return (
        <Button className="border border-blue-600" type="dashed">
          {time}
        </Button>
      );
    case "waiting":
      return <Button className="bg-blue-500 hover:text-black">{time}</Button>;
    case "ordered":
      return (
        <Button className="" type="primary" danger>
          {time}
        </Button>
      );
    default:
      return <Button className="bg-blue-500">{time}</Button>;
  }
};

export default Time;