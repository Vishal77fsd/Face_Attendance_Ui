import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem("admin", null);
    navigate("/login");
  };

  return (
    <>
      {location.pathname !== "/login" && (
        <div className="relative">
          <ul className="flex justify-center items-center gap-2 p-4 ">
            {localStorage.getItem("admin") === "null" &&
              localStorage.getItem("admin") === "undefined" && (
                <li
                  className="border rounded-md p-2 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Entry
                </li>
              )}
            {localStorage.getItem("admin") !== "null" &&
              localStorage.getItem("admin") !== "undefined" && (
                <li
                  className="border rounded-md p-2 cursor-pointer"
                  onClick={() => navigate("/employees/attendance")}
                >
                  Attendance
                </li>
              )}
            {localStorage.getItem("admin") !== "null" &&
              localStorage.getItem("admin") !== "undefined" && (
                <li
                  className="border rounded-md p-2 cursor-pointer"
                  onClick={() => navigate("/employees")}
                >
                  Employees
                </li>
              )}
            {localStorage.getItem("admin") !== "null" &&
              localStorage.getItem("admin") !== "undefined" && (
                <li
                  className="border rounded-md p-2 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </li>
              )}
            {(localStorage.getItem("admin") === "null" ||
              localStorage.getItem("admin") === "undefined") && (
              <li
                className="border rounded-md p-2 cursor-pointer"
                onClick={handleLogout}
              >
                Login
              </li>
            )}
            {localStorage.getItem("admin") !== "null" &&
              localStorage.getItem("admin") !== "undefined" && (
                <li
                  className="border rounded-md p-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
