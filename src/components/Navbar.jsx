import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <ul className="flex justify-center items-center gap-2 p-4 ">
        <li
          className="border rounded-md p-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Entry
        </li>
        <li
          className="border rounded-md p-2 cursor-pointer"
          onClick={() => navigate("/employees/attendance")}
        >
          Attendance
        </li>
        <li
          className="border rounded-md p-2 cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          Employee
        </li>
        <li
          className="border rounded-md p-2 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </li>
        <li className="border rounded-md p-2 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
