import axiosIns from '../../../utils/axiosIns';



export const fetchLogoutApi = async (token)=>{
   axiosIns.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   return await axiosIns.get('/account/logout/');
}














