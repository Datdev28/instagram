import { IoMdHeartEmpty } from "react-icons/io";
import searchToggleStore from "../../store/searchToggleStore";
import { LuDot } from "react-icons/lu";
import useNotificationStore from "../../store/useNotificationStore";
const Notifications = () => {
  const { isOpenToggle, setIsOpenToggle, setMode, mode } = searchToggleStore();
  const {hasNewNoti, setHasNewNoti} = useNotificationStore()
  const handleClickNotification = () => {
    if (mode === "notifications" && isOpenToggle) {
      setIsOpenToggle(false);
      setHasNewNoti(false);
    } else {
      setIsOpenToggle(true);
      setMode("notifications");
      setHasNewNoti(false);
    }
  };
  return (
    <div
      className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
      onClick={handleClickNotification}
    >
      <div className="relative">
      <IoMdHeartEmpty className={`text-3xl  ${mode === 'notifications' && isOpenToggle ? "border border-white rounded-md" : "border-transparent"}`}/>
       {hasNewNoti && (
        <LuDot className="absolute top-[-17px] right-[-20px] text-red-600 text-5xl"/>
       )}
      </div>
      {!isOpenToggle && <p className={`max-lg:hidden`}>Thông báo</p>}
    </div>
  );
};

export default Notifications;
