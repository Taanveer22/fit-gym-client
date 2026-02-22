// ----------------------------
// Parse any value to Date safely
// ----------------------------
// ----------------------------
// Safely convert any value to a JavaScript Date object
// ----------------------------
export const parseDate = (value) => {
  // 1️⃣ If no value is provided, return the current date & time
  if (!value) {
    return new Date();
  }

  // 2️⃣ Try to create a Date object from the value
  const date = new Date(value);

  // 3️⃣ Check if the created Date is valid
  //    If the date is invalid (NaN), fallback to current date
  if (isNaN(date.getTime())) {
    return new Date();
  }

  // 4️⃣ Return the valid Date object
  return date;
};


// ----------------------------
// Format date as "YYYY-MM-DD"
// ----------------------------
export const formatDateOnly = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// ----------------------------
// Format time as 12-hour "hh:mm AM/PM"
// ----------------------------
export const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12
  return `${hours}:${minutes} ${ampm}`;
};