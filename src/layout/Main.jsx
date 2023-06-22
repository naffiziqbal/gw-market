import { Outlet, useMatches } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const matches = useMatches()

let pathname = matches.some((value)=>value.pathname === '/login')


    return (
        <div>
           {!pathname ?  <Navbar/> : null}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;