import React, { useEffect, useState } from "react";
import SelectContact from "../../components/select/SelectContact";
import { useGetContactQuery } from "../../redux/features/contact/contactAPI";
import { deleteQuery } from "../../utils/loginUtils";
import styles from './ConfirmOrder.module.scss';

// component 
function ConfirmOrder() {
  const { data } = useGetContactQuery();
  const [selectContact , setSelectContact] = useState('Main')


  console.log(selectContact);


  useEffect(() => {
    deleteQuery();
  }, []);


  // select handler 
  const selectHandler = (label)=>{
   setSelectContact(label)
  }



  return (
    <div className={`custom_container`}>
      <div className={`row ${styles.confirm_order}`}>
        <div className={`col-7`}> </div>
        {/* contact  */}
        <div className={`col-5 `}>
          <div className= {` bg-black row  ${styles.contact} `}>
            {data?.contacts?.map((contact) => (
              <div key={contact?.id} className= {`col col-xl-6`} ><SelectContact contact={contact}   selectHandler = {selectHandler} /></div> 
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
