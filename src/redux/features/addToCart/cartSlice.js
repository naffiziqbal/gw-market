import { createSlice } from "@reduxjs/toolkit";

let cartItemsFromStorage = localStorage.getItem("cart");

cartItemsFromStorage = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage).data
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    /* ------------------------------ / add to cart ----------------------------- */
    addToCart: (state, action) => {
      const data = action?.payload;
      // check if item exist in cartItems
      const isExist = state.cartItems?.some(
        (value) => value?.item?.id === data?.id
      );
      //       add item to state
      if (!isExist) {
        state.cartItems = [...state.cartItems, { quantity: 1, item: {...data , sum_price: data?.price , sum_count_per_quantity: data?.count_per_quantity}}];

        localStorage.setItem("cart", JSON.stringify({ data: state.cartItems }));
      }
    },

    /* -------------------------------remove item from cart action------------------------------------------- */
    removeItem: (state, action) => {
      const id = action?.payload?.id;
      state.cartItems = state.cartItems.filter(
        (value) => value?.item?.id !== id
      );
      localStorage.setItem("cart", JSON.stringify({ data: state.cartItems }));
    },
    /* --------------------------------/-remove from cart action end-------------------------------------- */
    /* -------------------------------remove item from cart action------------------------------------------- */
    removeAll: (state, action) => {
      state.cartItems = [{ quantity: 0, item: {} }];
      localStorage.removeItem("cart");
    },

    /* --------------------------------/-remove from cart action end-------------------------------------- */
    /* -------------------------------- increment -------------------------------- */
    increment: (state, action) => {
      const id = action.payload.id;
      state.cartItems.forEach((value) => {
        if (value?.item.id === id) {
          value.quantity +=1;
          value.item.sum_price = parseFloat((value.quantity * value.item.price).toFixed(3))
          value.item.sum_count_per_quantity = parseFloat((value.quantity * value.item.count_per_quantity).toFixed(3))
        }
      });

      localStorage.setItem("cart", JSON.stringify({ data: state.cartItems }));
    },
    /* -------------------------------- decrement ------------------------------- */
    decrement: (state, action) => {
      const id = action.payload.id;
      state.cartItems.forEach((value) => {
        if (value?.item.id === id) {
        
         if(value.quantity > 1){
          value.quantity -=1 
          value.item.sum_price = parseFloat((value.quantity * value.item.price).toFixed(3))
          value.item.sum_count_per_quantity = parseFloat((value.quantity * value.item.count_per_quantity).toFixed(3))
         }
        }
      });

      localStorage.setItem("cart", JSON.stringify({ data: state.cartItems }));
    },
  },
});

export const { addToCart, removeAll, removeItem  ,increment , decrement} = cartSlice.actions;
export default cartSlice;
