import { IoMdHeartEmpty } from "react-icons/io";
import searchToggleStore from "../../store/searchToggleStore";

const Notifications = () => {
  const { isOpenToggle, setIsOpenToggle, setMode, mode } = searchToggleStore();
  const handleClickNotification = () => {
    if (mode === "notifications" && isOpenToggle) {
      setIsOpenToggle(false);
    } else {
      setIsOpenToggle(true);
      setMode("notifications");
    }
  };
  return (
    <div
      className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
      onClick={handleClickNotification}
    >
      <IoMdHeartEmpty className={`text-3xl  ${mode === 'notifications' && isOpenToggle ? "border border-white rounded-md" : "border-transparent"}`}/>
      {!isOpenToggle && <p className={`max-lg:hidden`}>Thông báo</p>}
    </div>
  );
};

export default Notifications;
