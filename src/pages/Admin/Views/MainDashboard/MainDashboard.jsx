import React from "react";
import MiniCalendar from "../../../../components/Calendar/MiniCalendar";

const MainDashboard = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        {/* <TaskCard /> */}
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
