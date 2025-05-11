import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
     <div>
         <div
           className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
         >
           <CiSearch className="text-3xl"/>
           <p className={`max-lg:hidden`}>
             Tìm kiếm
           </p>
         </div>
     </div>
  )
}

export default Search
