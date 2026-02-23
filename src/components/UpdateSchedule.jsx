import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useLoaderData, useParams } from "react-router-dom";
// parseDate → converts stored string into JS Date object
// formatDateOnly → formats date before sending to backend
// formatTime12Hour → formats time before sending to backend
import {
  parseDate,
  formatDateOnly,
  formatTime12Hour,
} from "../utils/formatDateTime";

const UpdateSchedule = () => {
  const { id } = useParams();
  const loadedData = useLoaderData();
  // console.log(id);
  // console.log(loadedData);

  // -------------------------
  // 🧠 Controlled Input (React Controls the Input)
  // 👉 The input value is controlled by React state.
  // -------------------------
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("friday");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // -------------------------
  // useEffect runs after component renders
  // It syncs loadedData into state variables
  // Without this, inputs would not show existing values
  // -------------------------
  useEffect(() => {
    if (!loadedData) return;
    const updateForm = () => {
      setTitle(loadedData?.title || "");
      setDay(loadedData.day || "friday");
      setDate(parseDate(loadedData.date));
      setTime(parseDate(loadedData.time));
    };
    updateForm();
  }, [loadedData]);

  const handleUpdateScheduleForm = async (e) => {
    e.preventDefault();
    // Format date before sending to backend
    const formattedDate = formatDateOnly(date);
    // Format time before sending to backend
    const formattedTime = formatTime12Hour(time);
    // Create updated object
    const info = { title, day, date: formattedDate, time: formattedTime };
    // console.log(info);

    // Sending PATCH request to backend
    // PATCH → used to update existing data
    const response = await fetch(`http://localhost:5000/schedules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    // console.log(data);
    if (data.modifiedCount > 0) {
      Swal.fire("Schedule updated successfully");
    }
  };

  return (
    <div className="bg-gray-200 py-12 lg:py-20">
      <h1 className="text-2xl font-medium text-center my-3">
        Update Your Schedule
      </h1>
      <form onSubmit={handleUpdateScheduleForm} className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* Title */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Title
            </legend>
            <input
              type="text"
              className="input w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </fieldset>

          {/* Date */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker
              className="input w-full"
              selected={date}
              onChange={(d) => d && setDate(d)}
              dateFormat="yyyy-MM-dd"
            />
          </fieldset>

          {/* Day */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Day
            </legend>
            <select
              className="input w-full"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
            </select>
          </fieldset>

          {/* Time */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
              className="input w-full"
              selected={time}
              onChange={(t) => t && setTime(t)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </fieldset>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-6 w-full">
            Update Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSchedule;
