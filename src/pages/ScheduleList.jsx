import { useLoaderData } from "react-router-dom";
import ScheduleListItem from "./ScheduleListItem";
import { useState } from "react";
import Swal from "sweetalert2";

const ScheduleList = () => {
  const loadedList = useLoaderData();
  // console.log(loadedList);
  const [tableList, setTableList] = useState(loadedList);
  // console.log(tableList);
  
  const handleDelete = (id) => {
    // console.log(id);
    fetch(`http://localhost:5000/schedules/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire("delete item successfully");
        }
        const remainingList = tableList.filter((list) => list._id !== id);
        setTableList(remainingList);
      });
  };
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
        <div>
          {tableList.map((item, index) => (
            <ScheduleListItem
              item={item}
              index={index}
              key={item._id}
              handleDelete={handleDelete}
            ></ScheduleListItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
