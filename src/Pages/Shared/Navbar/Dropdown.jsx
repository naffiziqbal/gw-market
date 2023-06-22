import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import styles from './Navbar.module.scss';

 const Dropdown = ({ isOpen , handleOpen }) => {

const dispatch = useDispatch()


const logout = async()=>{
  try{
    const res = await fetch('https://grocerywatch.herokuapp.com/account/logout/');

    console.log(await res.json());


    Cookies.remove('authUserData')
    dispatch(userLoggedOut({}))

  }catch(err){
    console.log(err);
  }
}


    if (isOpen)
      return (
        <ul className= {`position-absolute top-100 end-0 ${styles.dropdown}  list-unstyled `}>
          <li>
            <button type="button" className="btn " onClick={()=>{logout() , handleOpen()}}  >
              Logout
            </button>
          </li>
        </ul>
      );
  };
  
  export default Dropdown