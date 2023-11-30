import { Button } from "antd";
import { lichhen4 } from "~/fakedata/lhnv";
import React from "react";
import TableLichHen from "~/components/dentist/TableLichHen";

const ThongTinLichHen = ({data}) => {
  return (
    <>
      <div className=" h-12 w-[400px] bg-red-500">sdf</div>
    </>
  );
};
const XemLichTruc = () => {
  // goi api tren day
  return (
    <>
      <div className="flex flex-col">
        <TableLichHen data={lichhen4} />
        <div className=" bg-gray-300 flex">
          <div className=" bg-red-400 h-[150px] w-[300px]">
            may cai mo tasadfsdfsdf tren day
          </div>
          <div className="flex  ml-auto items-center gap-10 ">
            <Button>Hoan Tac</Button>
            <Button className="bg-green-600">Dang Ki</Button>
          </div>
        </div>
      </div>
      <ThongTinLichHen />
    </>
  );
};
export default XemLichTruc;
