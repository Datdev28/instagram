import { MdOutlineExplore } from "react-icons/md";
import searchToggleStore from "../../store/searchToggleStore";
const Explore = () => {
  const { isOpenToggle } = searchToggleStore();
  return (
    <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
      <MdOutlineExplore className="text-3xl" />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Khám phá</p>}
    </div>
  );
};

export default Explore;
