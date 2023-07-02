import { useUpdateCartMutation } from '../redux/features/addToCart/cartAPI';
import { convertCartItemDataForAPI } from '../utils/cart';


function useAddToCartFromLocal() {
const [updateCart , { data:resData, isLoading }] = useUpdateCartMutation() 


const dataFromLocal = localStorage.getItem('cart');
const data = dataFromLocal ? JSON.parse(dataFromLocal) : null;


const update = ()=>{
    if(data){
      const payload = convertCartItemDataForAPI(data?.cart_items)
      updateCart({ cart_items: payload })
    }
   
}

  return {isLoading  , data: resData , updateCart: update , localData: data}
}

export default useAddToCartFromLocal