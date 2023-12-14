import React, { useState, useEffect } from "react";
import hsb from "../../fakedata/hsb";
import "../../assets/styles/guest.css";
const HoSoBenh = lazy(() => import("~/components/HoSoBenh"));

const XemHoSoBenh_KH = () => {
  const [phone, setPhone] = useState("");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-[1200px] flex flex-col gap-5 mt-5">
            <HoSoBenh sdt={phone} isStaff={0} />
      </div>
    </Suspense>
  );
};

export default XemHoSoBenh_KH;
