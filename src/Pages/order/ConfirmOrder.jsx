import React, { useEffect } from "react";
import { deleteQuery } from "../../utils/loginUtils";

function ConfirmOrder() {
  useEffect(() => {
    deleteQuery();
  }, []);

  return <div>ConfirmOrder</div>;
}

export default ConfirmOrder;
