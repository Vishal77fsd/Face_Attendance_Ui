const Notification = ({ title }) => {
  return (
    <div className="absolute left-[50%] bottom-2 -translate-x-[50%] z-[100]">
      <div className="text-black p-3 border border-white bg-white rounded-md text-center animate-slideUp">
        {title}
      </div>
    </div>
  );
};

export default Notification;
