import React from "react";
import ReactSelect from "react-select";


export function Select({ data , isLoading  ,  placeholder , className}) {

  return (
    <div>
      <ReactSelect options={data}  isSearchable cacheOptions isLoading={isLoading}  placeholder={placeholder} className= {`${className} select`} />
    </div>
  );
}

