import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
// formatDateOnly → formats date (like 2026-02-22)
// formatTime12Hour → formats time (like 10:30 PM)
import { formatDateOnly, formatTime12Hour } from "../utils/formatDateTime";

const AddSchedule = () => {
  // Creating state to store selected date
  // Default value is today's date (new Date())
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Creating state to store selected time
  // Default value is current time
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleAddScheduleForm = async (e) => {
    e.preventDefault();
    // Convert selectedDate into formatted date string
    const formattedDate = formatDateOnly(selectedDate);
    // Convert selectedTime into formatted 12-hour time string
    const formattedTime = formatTime12Hour(selectedTime);

    // Creating an object that will be sent to the backend
    // 🧠 Uncontrolled Input (DOM Controls the Input)
    // 👉 The input stores its own value internally (like plain HTML).
    const info = {
      date: formattedDate,
      time: formattedTime,
      title: e.target.title.value,
      day: e.target.day.value,
      isCompleted: false,
    };
    // console.log(info);

    // Sending POST request to backend to save schedule in database
    const response = await fetch(`http://localhost:5000/schedules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    // console.log(data);
    if (data.insertedId) {
      Swal.fire("Schedule created in db");
    }
  };

  return (
    <div className="bg-rose-200 py-12 lg:py-20">
      <h1 className="text-2xl font-medium text-center my-3">
        Add Your Schedule
      </h1>
      <form onSubmit={handleAddScheduleForm} className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* Title */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Title
            </legend>
            <input
              type="text"
              name="title"
              className="input w-full"
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
              selected={selectedDate}
              onChange={(d) => d && setSelectedDate(d)}
              dateFormat="yyyy-MM-dd"
            />
          </fieldset>

          {/* Day */}
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Day
            </legend>
            <select className="input w-full" name="day">
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
              selected={selectedTime}
              onChange={(t) => t && setSelectedTime(t)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </fieldset>
        </div>
        <div>
          <button className="btn btn-secondary mt-6 w-full">
            Add Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchedule;
