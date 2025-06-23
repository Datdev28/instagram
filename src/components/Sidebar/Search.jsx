import { CiSearch } from "react-icons/ci";
import searchToggleStore from "../../store/searchToggleStore"
const Search = () => {
  const {isOpenToggle, setIsOpenToggle, setMode, mode} = searchToggleStore();
  const handleClickSearch = () => {
    if(mode === 'search' && isOpenToggle){
      setIsOpenToggle(false);
    }else{
      setIsOpenToggle(true);
      setMode('search')
    }
  }
  return (
    <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
     onClick={handleClickSearch}    
    >
      <CiSearch className={`text-3xl  ${mode === 'search' && isOpenToggle ? "border border-white rounded-md" : "border-transparent"}`} />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Tìm kiếm</p>}
    </div>
  );
};

export default Search;
