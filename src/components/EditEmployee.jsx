import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import Loading from "../Notification/Loading";

const EditEmployee = () => {
  const params = useParams();
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE}/employee/${params.id}`)
      .then((res) => {
        setIsLoading(true);
        setUser(res.data);
        setFirstName(res.data.firstname);
        setMiddleName(res.data.middlename);
        setLastName(res.data.lastname);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClear() {
    setFirstName("");
    setMiddleName("");
    setLastName("");
  }

  function handleSave() {
    if (firstName === "" || middleName === "" || lastName === "") {
      console.log("Empty feild");
      return;
    }

    const data = {
      firstName,
      middleName,
      lastName,
    };
    axios
      .put(`${import.meta.env.VITE_APP_BASE}/employee/update/${user._id}`, {
        data,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {(localStorage.getItem("admin") === "null" ||
        localStorage.getItem("admin") === "undefined") && (
        <Navigate to="/login" />
      )}

      {isLoading && <Loading />}
      <div className={`${isLoading && "blur-md"}`}>
        <div className="p-8">
          {user !== undefined && (
            <div className="w-[50%] m-auto relative">
              <img
                src={`${import.meta.env.VITE_APP_BASE}/uploads/${
                  user.img.split("\\")[1]
                }`}
                alt="profile photo"
                className="rounded-md border-[2px] object-contain border-gray-400 m-auto w-[100%]"
              />
              <div className="bg-[#EF5536] border p-2 absolute -bottom-3 -right-3 rounded-full cursor-pointer">
                <FiEdit2 className="m-auto" size={"1rem"} />
              </div>
            </div>
          )}
        </div>
        <div className="m-auto flex flex-col items-center justify-center gap-10 p-6">
          <div className="flex gap-10 flex-wrap justify-center items-center">
            <div>
              First name
              <br />
              <input
                type="text"
                className="rounded-md p-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              Middle name
              <br />
              <input
                type="text"
                className="rounded-md p-2"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              Last name
              <br />
              <input
                type="text"
                className="rounded-md p-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-10">
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>

        <button
          className="relative left-4 bottom-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default EditEmployee;
