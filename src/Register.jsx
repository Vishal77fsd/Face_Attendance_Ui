import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Notification from "./Notification/Notification";
import Loading from "./Notification/Loading";

const Register = () => {
  const [empName, setEmpName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [cameraBlocked, setCameraBlocked] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          // Camera is not blocked
          console.log("Camera access granted");
          setCameraBlocked(false);
        })
        .catch((error) => {
          // Camera is blocked
          console.error("Camera access denied", error);
          setCameraBlocked(true);
        });
    } else {
      console.error("getUserMedia is not supported by this browser");
    }
  }, []);

  const webcamRef = useRef(null);
  const registerUser = async () => {
    setIsLoading(true);
    if (empName === "") {
      console.log("Please Enter Your Name");
      setIsFieldEmpty(true);
      setTimeout(() => {
        setIsFieldEmpty(false);
        setCameraBlocked(false);
      }, 2000);
      return;
    }
    axios
      .post("http://localhost:3000/upload", {
        name: empName,
        img: webcamRef.current.getScreenshot(),
      })
      .then((response) => {
        setIsLoading(false);
        setResponse(response.data);
        setEmpName("");

        setTimeout(() => {
          setIsLoading(false);
          setResponse(null);
        }, 3000);
        // console.log("Employee " + response.data + " Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setResponse(null);
      });
    setEmpName("");
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      {isLoading && <Loading />}
      {isFieldEmpty && <Notification title="Please Enter Your Name!" />}
      {cameraBlocked && <Notification title="Please Enable Camera First" />}
      {response && <Notification title={response} />}
      <div className={` flex justify-center items-center`}>
        <div className="flex flex-col justify-center items-center w-full">
          <div>
            <Webcam
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={videoConstraints}
              className="rounded-md"
            />
          </div>
          <div className="flex gap-10 m-8">
            <input
              type="text"
              value={empName}
              placeholder="Enter Employee Name"
              onChange={(e) => setEmpName(e.target.value)}
              className="rounded-md p-2"
            />
            <button onClick={registerUser} className="">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
