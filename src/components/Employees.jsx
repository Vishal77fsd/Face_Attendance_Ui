import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import Loading from "../Notification/Loading";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE}/employees`)
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

  const handleEdittable = (id) => {
    console.log(id);
    const path = `${id}`;

    navigate(path);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .post(`${import.meta.env.VITE_APP_BASE}/employees/delete/${id}`)
      .then((res) => {
        console.log(res);
        axios
          .get(`${import.meta.env.VITE_APP_BASE}/employees`)
          .then((result) => {
            console.log(result.data);
            setEmployees(result.data);
            setIsUserDeleted(true);

            setTimeout(() => {
              setIsUserDeleted(false);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setIsUserDeleted(false);
          });
      })
      .catch((err) => console.log(err));
  };
  console.log(localStorage.getItem("admin"));
  return (
    <>
      {localStorage.getItem("admin") === "null" && <Navigate to="/login" />}
      {localStorage.getItem("admin") === "undefined" && (
        <Navigate to="/login" />
      )}

      {localStorage.getItem("admin") !== "null" &&
        localStorage.getItem("admin") !== "undefined" && (
          <>
            {isLoading && <Loading />}
            <div className={`${isLoading && "blur-md"}`}>
              {isUserDeleted && (
                <Notification title="User Deleted Successfully" />
              )}
              <div className="flex flex-wrap gap-10 justify-center items-center p-10">
                {employees.map((employee, index) => {
                  return (
                    <div
                      className="h-64 w-64 p-2 rounded-md border-white  bg-[#353535]"
                      key={index}
                    >
                      <h3>
                        {employee.firstname} {employee.middlename}{" "}
                        {employee.lastname}
                      </h3>
                      <img
                        src={`${import.meta.env.VITE_APP_BASE}/${employee.img}`}
                        alt="profile photo"
                      />

                      <div className="flex justify-between items-center p-4">
                        <button
                          onClick={() => {
                            handleEdittable(employee._id);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="bg-red-700"
                          onClick={() => {
                            handleDelete(employee.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default Employees;
