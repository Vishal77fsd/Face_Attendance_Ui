import axios from "axios";
import { useEffect, useState } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import Loading from "../Notification/Loading";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getDaysInCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }
  const days = getDaysInCurrentMonth();

  function temp() {
    let res = [];
    for (let i = 0; i <= days; i++) {
      res.push(
        <div key={i} className="p-4 border flex-none w-32">
          {i}/{new Date().getMonth() + 1}/{new Date().getFullYear()}
        </div>
      );
    }
    return res;
  }

  function getAttendanceOfEmployee(employeeAttendance) {
    let res = [];

    for (let i = 0; i <= days; i++) {
      const date = `${i}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`;

      const idx = employeeAttendance.findIndex(
        (attendance) => Object.keys(attendance)[0] === date
      );
      if (idx === -1) {
        res.push(
          <div
            key={i}
            className="p-1 border flex-none h-16 w-32 flex flex-col justify-center items-center rounded-md "
          >
            Nahi Aya
          </div>
        );
      } else {
        const todaysAttendance = employeeAttendance[idx];
        const todaysDate = Object.keys(todaysAttendance)[0];
        const attendanceDetails = todaysAttendance[todaysDate];
        // console.log(attendanceDetails.checkIn);
        // console.log(attendanceDetails.checkOut);
        res.push(
          <div
            key={i}
            className="p-1 border flex-start h-16 w-32 flex flex-col gap-2 justify-center items-center rounded-md"
          >
            <div className="flex justify-center items-center">
              <div>
                <SlArrowRightCircle />
              </div>
              <div>
                {attendanceDetails.checkIn != null
                  ? attendanceDetails.checkIn
                  : "NA"}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <SlArrowLeftCircle />
              </div>
              <div>
                {attendanceDetails.checkOut != null
                  ? attendanceDetails.checkOut
                  : "NA"}
              </div>
            </div>
          </div>
        );
      }
    }
    return res;
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/employees")
      .then((result) => {
        setIsLoading(true);
        console.log(result.data);
        setEmployees(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className={`${isLoading && "blur-sm"}`}>
        <div className="w-fit overflow-hidden rounded-md">
          <div className="flex bg-[#606060] text-black ">
            <div className="p-4 z-20 border flex-none w-32 fixed bg-red-500">
              Name
            </div>
            {temp()}
          </div>
          <div className="bg-blue-800">
            {employees.map((employee, index) => (
              <div key={index} className="flex items-center overflow-hidden">
                <div className="p-4 z-20 flex-none h-16 w-32 bg-[#465fc1] fixed">
                  {employee.firstname}
                </div>
                {getAttendanceOfEmployee(employee.attendance)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
