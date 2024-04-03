import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);

  const handleLogin = () => {
    if (email === "" || password === "") {
      return;
    }

    axios
      .post(`${import.meta.env.VITE_APP_BASE}/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setPassword("");
        setIsRedirect(true);
        localStorage.setItem("admin", res.data._id);
      })
      .catch((err) => {
        console.log(err);
        setIsRedirect(false);
      });
  };

  if (isRedirect) {
    return <Navigate to="/employees/attendance" />;
  }

  return (
    <>
      {localStorage.getItem("admin") !== "null" &&
        localStorage.getItem("admin") !== "undefined" && (
          <Navigate to="/employees" />
        )}

      <div className="flex justify-center items-center h-[100vh] w-full">
        <div className="bg-[#0c0c0c] w-fit p-8 rounded-md flex flex-col justify-center items-center">
          <div className="m-2 w-[100%]">
            <div className="text-2xl">Email</div>
            <input
              type="email"
              className="p-2 rounded-md w-[100%]"
              placeholder="Please Enter Admin Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="m-2 w-[100%]">
            <div className="text-2xl">Password</div>
            <input
              type="password"
              value={password}
              className="p-2 rounded-md w-[100%]"
              placeholder="Please Enter Admin Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
