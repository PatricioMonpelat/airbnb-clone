import Image from "next/image";
import logo3 from "../assets/img/logo3.png";
import {  SearchIcon,  GlobeAltIcon,  MenuIcon,  UserCircleIcon,  UserIcon} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  // console.log(searchInput)

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-lg p-5 md:px-10">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image src={logo3} alt="logo" className="w-20" />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 "
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 fill-[#FF385C] text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer hover:bg-gray-100 text-[#222222] rounded-full p-3">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 hover:bg-gray-100" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-lg ">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FF385C"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold ">
              Number of Guests
            </h2>

            <UserIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-[#FF385C]"
              value={noOfGuests}
              min={1}
              onChange={(e) => setNoOfGuests(e.target.value)}
            />
          </div>

          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel{" "}
            </button>
            <button onClick={search} className="flex-grow text-[#FF385C]">
              Search{" "}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
