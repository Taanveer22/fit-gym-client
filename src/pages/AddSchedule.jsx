const AddSchedule = () => {
  return (
    <div className="bg-rose-200 py-12 lg:py-20">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-medium text-center my-3">
        Select Your Schedule
      </h1>
      <form className="w-11/12 mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg font-semibold">
              Title
            </legend>
            <input type="text" className="input w-full" placeholder="Title" />
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Date
            </legend>
            <input type="text" className="input w-full" placeholder="Title" />
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Day
            </legend>
            <input type="text" className="input w-full" placeholder="Title" />
          </fieldset>
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend text-lg font-semibold">
              Time
            </legend>
            <input type="text" className="input w-full" placeholder="Title" />
          </fieldset>
        </div>
        <button className="btn btn-secondary mt-6 w-full">Add Schedule</button>
      </form>
    </div>
  );
};

export default AddSchedule;
