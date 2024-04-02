import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div>
      <div className="absolute flex justify-center items-center z-10 h-[80vh] w-[100vw]">
        <ReactLoading type="balls" color="#0000FF" height={50} width={50} />
      </div>
    </div>
  );
};

export default Loading;
