import React, { useEffect, useRef } from "react";
import ReactSelect from "react-select";

export const Select = React.memo(
  ({ data = [], isLoading, placeholder, className, changeHandler,   menuOpenHandler}) => {
    const selectRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        const inputElement = inputRef.current.querySelector("input");
        if (inputElement) {
          inputElement.setAttribute("autocomplete", "off");
        }
      }
    }, []);

    return (
      <div ref={selectRef}>
        <ReactSelect
          options={data}
          isSearchable
          cacheOptions
          isClearable={false}
          isOptionSelected={true}
          isLoading={isLoading}
          placeholder={placeholder}
          className={`${className} select`}
          required={true}
          onChange={changeHandler}
         
          inputRef={inputRef}
          onMenuOpen={menuOpenHandler}
   
        />
      </div>
    );
  }
);
