import { MdOutlineExplore, MdExplore } from "react-icons/md";
import searchToggleStore from "../../store/searchToggleStore";
import { useLocation, useNavigate } from "react-router-dom";

const Explore = () => {
  const { isOpenToggle } = searchToggleStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === "/explore";

  return (
    <div
      className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
      onClick={() => navigate("/explore")}
    >
      {isActive ? (
        <MdExplore className="text-3xl" />
      ) : (
        <MdOutlineExplore className="text-3xl" />
      )}
      {!isOpenToggle && <p className="max-lg:hidden">Khám phá</p>}
    </div>
  );
};

export default Explore;
