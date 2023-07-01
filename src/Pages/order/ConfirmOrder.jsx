import React, { useEffect } from "react";
import SelectContact from "../../components/select/SelectContact";
import { deleteQuery } from "../../utils/loginUtils";


function ConfirmOrder() {
  useEffect(() => {
    deleteQuery();
  }, []);

  return <div>ConfirmOrder
    <SelectContact/>
  </div>;
}

export default ConfirmOrder;
