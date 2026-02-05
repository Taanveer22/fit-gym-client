import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

// ======================
// Utility function
// Format time into 12-hour AM/PM format
// ======================
const formatTime12Hour = (date) => {
  // get hour from date
  let hour = date.getHours();
  // get minute and always keep 2 digits (ex: 05)
  const minute = String(date.getMinutes()).padStart(2, "0");
  // get second and always keep 2 digits (ex: 05)
  const second = String(date.getSeconds()).padStart(2, "0");
  // check AM or PM
  const AmPm = hour >= 12 ? "PM" : "AM";
  // convert 24-hour to 12-hour format
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return `${hour} : ${minute} : ${second} ${AmPm}`;
};
// console.log(formatTime12Hour(new Date()));

const AddSchedule = () => {
  // ======================
  // State Management
  // ======================
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // ======================
  // Handle Form Submit
  // ======================
  const handleAddScheduleForm = (e) => {
    e.preventDefault();
    // format time using our function
    const formattedTime = formatTime12Hour(selectedTime);
    // format date to YYYY-MM-DD
    const formattedDate = selectedDate.toLocaleDateString("en-CA");
    const title = e.target.title.value;
    const day = e.target.day.value;

    const scheduleData = {
      time: formattedTime,
      date: formattedDate,
      title: title,
      day: day,
    };
    // console.log(scheduleData);

    // ======================
    // API Request
    // ======================
    fetch(`http://localhost:5000/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire("schedule added via post method");
        }
      });
  };

  return (
    <div className="bg-rose-200 py-12 lg:py-20">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-medium text-center my-3">
        Select Your Schedule
      </h1>
      <form onSubmit={handleAddScheduleForm} className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* title */}
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
          {/* date picker */}
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            ></DatePicker>
          </fieldset>
          {/* day */}
          <fieldset className="fieldset w-full ">
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
          {/* time picker */}
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedTime}
              onChange={(time) => time && setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            ></DatePicker>
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
