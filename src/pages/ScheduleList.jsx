import { useLoaderData } from "react-router-dom";
import ScheduleListItem from "./ScheduleListItem";
import { useState } from "react";

const ScheduleList = () => {
  const loadedList = useLoaderData();
  // console.log(loadedList);
  const [stateList, setStateList] = useState(loadedList);
  return (
    <div>
      {/* search bar */}
      <div className="flex justify-center items-center my-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
      </div>
      {/* send data to child */}
      {loadedList.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <div className="">
          {stateList.map((item, index) => (
            <ScheduleListItem
              item={item}
              index={index}
              key={item._id}
              stateList={stateList}
              setStateList={setStateList}
            ></ScheduleListItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
