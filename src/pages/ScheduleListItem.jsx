import { MdDeleteForever } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";

const ScheduleListItem = ({ item, index }) => {
  // console.log(item, index);
  return (
    <div>
      {/* table list item */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{index + 1}</th>
              <td>{item?.title}</td>
              <td>{item?.day}</td>
              <td>{item?.date}</td>
              <td>{item?.time}</td>
              <td>
                <div className="flex items-center gap-1">
                  <button className="btn btn-xs btn-secondary">
                    <MdDeleteForever size={15}></MdDeleteForever>
                  </button>
                  <button className="btn btn-xs btn-secondary">
                    <FaFile size={15}></FaFile>
                  </button>
                  <button className="btn btn-xs btn-secondary">
                    <FaCheck size={15}></FaCheck>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleListItem;
