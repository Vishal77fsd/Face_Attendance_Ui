import axios from "axios";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Notification from "./Notification/Notification";
import Loading from "./Notification/Loading";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [label, setLabel] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setIsClicked(true);
    setIsLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();

    axios
      .post(`${import.meta.env.VITE_APP_BASE}/checkin`, {
        imageSrc,
      })
      .then((response) => {
        setIsLoading(true);
        setShowNotification(true);
        setLabel(response.data._label);
        setTimeout(() => {
          setIsLoading(false);
          setShowNotification(false);
          setLabel("");
          setIsClicked(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [webcamRef]);

  const checkout = useCallback(() => {
    setIsClicked(true);
    setIsLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    axios
      .post("http://localhost:3000/checkout", {
        imageSrc,
      })
      .then((response) => {
        setShowNotification(true);
        setIsLoading(true);
        // console.log("Employee " + response.data._label + " Added Successfully");
        setLabel(response.data._label);
        setResponse(response.data);
        setTimeout(() => {
          setShowNotification(false);
          setLabel("");
          setIsClicked(false);
          setIsLoading(false);
          setResponse(null);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsClicked(false);
        setResponse(err);

        setTimeout(() => {
          setResponse(null);
        }, 2000);
      });
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      {localStorage.getItem("admin") !== "null" &&
        localStorage.getItem("admin") !== "undefined" && (
          <Navigate to="/login" />
        )}

      <div>
        {isLoading && <Loading />}

        <div className="h-[100vh]">
          {response?.length > 0 && <Notification title={response} />}
          <div
            className={`flex flex-col justify-center items-center ${
              isLoading && `blur-md`
            }`}
          >
            <div>
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={720}
                videoConstraints={videoConstraints}
                className="rounded-md"
              />
            </div>
            <div className="flex gap-10 m-8">
              <button disabled={isClicked} onClick={capture} className="">
                Check In
              </button>

              <button disabled={isClicked} onClick={checkout} className="">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
