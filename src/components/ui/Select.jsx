import { useState, useEffect } from "react";
import cn from "../../utils/cn";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React from "react";

const Select = ({
  className,
  state,
  setState,
  options,
  isDesktop,
  isSearchable,
  search,
  setSearch,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(state.valueName || "");

  useEffect(() => {
    setSelectedValue(state.valueName || "");
  }, [state]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setState(option);
    setSelectedValue(option.valueName);
    setIsOpen(false);
  };

  let filteredOptions = options;

  if (isSearchable) {
    filteredOptions = options.filter((option) =>
      search === ""
        ? option
        : option.valueName.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className={`w-full flex gap-2 items-center relative`}>
      <div className="w-full relative">
        <input
          type="text"
          readOnly
          value={selectedValue}
          onClick={toggleDropdown}
          {...props}
          className={cn(
            "bg-white select-none cursor-pointer flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 pr-8",
            className
          )}
        />
        <div
          className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2"
          onClick={toggleDropdown}
        >
          {isOpen ? (
            <ChevronUp size={20} color="#00172A" />
          ) : (
            <ChevronDown size={20} color="#00172A" />
          )}
        </div>
      </div>

      {isDesktop ? (
        <div
          className={`${
            isOpen ? "" : "hidden"
          } p-1 max-h-96 select-none overflow-y-scroll absolute border rounded-lg bg-white z-50 mt-6 inset-x-0 top-4 space-y-2`}
        >
          {isSearchable ? (
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-9 bg-white flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                  <Search color="#64748b" size={20} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <ul>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="p-2 cursor-pointer hover:bg-slate-200 rounded-lg"
              >
                {option.valueName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`${
            isOpen ? "" : "hidden"
          } px-1 py-4 select-none fixed border rounded-lg bg-white z-50 mt-6 left-0 w-full bottom-0 max-h-1/2 overflow-y-auto space-y-2`}
          style={{ maxHeight: "50vh" }} // Ensure max height is 50% of viewport height
        >
          {isSearchable ? (
            <div>
              <div className="fixed w-full pr-3">
                <input
                  type="text"
                  className="pl-9 bg-white flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                  <Search color="#64748b" size={20} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <ul className={`${isSearchable ? "pt-9" : ""}`}>
            {filteredOptions.length === 0 ? (
              <div className="w-full text-center py-4">
                <p>Нет данных</p>
              </div>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className="p-2 cursor-pointer hover:bg-slate-200 rounded-lg"
                >
                  {option.valueName}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <div
        className={`${
          isOpen ? "" : "hidden"
        } fixed inset-0 bg-slate-200 opacity-40 z-40`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default Select;
