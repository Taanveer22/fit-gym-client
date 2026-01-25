import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours} : ${minutes} : ${seconds} ${ampm}`;
};
// console.log(formatTime12Hour(new Date()));

const AddSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddScheduleForm = (e) => {
    e.preventDefault();
    const formattedTime = formatTime12Hour(selectedTime);
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
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedDate}
              onChange={(clickedDate) => setSelectedDate(clickedDate)}
            ></DatePicker>
          </fieldset>
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
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <DatePicker
              className="input w-full"
              selected={selectedTime}
              onChange={handleTimeChange}
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
