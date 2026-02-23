import { useLoaderData } from "react-router-dom";
import ScheduleListItem from "./ScheduleListItem";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ScheduleList = () => {
  const loadedList = useLoaderData();
  // console.log(loadedList);
  const [tableList, setTableList] = useState(loadedList);
  // console.log(tableList);
  const [search, setSearch] = useState("");

  const handleDeleteItem = (id) => {
    // console.log(id);
    fetch(`http://localhost:5000/schedules/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Update the UI immediately so it feels fast
        const remainingList = tableList.filter((list) => list._id !== id);
        setTableList(remainingList);
        // Show the success message
        if (data.deletedCount > 0) {
          Swal.fire("delete item successfully");
        }
      });
  };

  const handleUpdateStatus = (id) => {
    // console.log(id);
    fetch(`http://localhost:5000/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Update the UI immediately so it feels fast
        // Copy everything from list, but change isCompleted to true
        const updatedList = tableList.map((list) =>
          list._id === id ? { ...list, isCompleted: true } : list,
        );
        setTableList(updatedList);
        // Show the success message
        if (data.modifiedCount) {
          Swal.fire("status updated");
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/schedules?searchQuery=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTableList(data);
      });
  }, [search]);

  // console.log(search);

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
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search by title"
          />
        </label>
      </div>
      {/* send data to child */}
      {tableList.length === 0 ? (
        <p className="text-2xl font-semibold text-red-500 text-center mt-6">
          No Data Found
        </p>
      ) : (
        <div>
          {tableList.map((item, index) => (
            <ScheduleListItem
              item={item}
              index={index}
              key={item._id}
              handleDeleteItem={handleDeleteItem}
              handleUpdateStatus={handleUpdateStatus}
            ></ScheduleListItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
