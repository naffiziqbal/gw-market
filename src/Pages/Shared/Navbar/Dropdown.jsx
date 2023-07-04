import { useLogout } from '../../../hooks/useLogout';
import styles from './Navbar.module.scss';

 
const Dropdown = ({ isOpen , handleOpen }) => {

const {logout , success , isLoading , error} = useLogout();



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