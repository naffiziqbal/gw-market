import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIns from "../../../utils/axiosIns";

const updateCartAPI = async (data , token) => {
  try {
    axiosIns.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axiosIns.post("/customer/update-cart/", { ...data });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateCart = createAsyncThunk(
  "customer/update-cart",
  async (data , {getState}) => {
    const token = getState().auth?.loggedInUser?.token;
    const res = await updateCartAPI(data , token);
    return res.data;
  }
);

/* ------------------------------ initial state ----------------------------- */
const initialState = {
  cartItems: [],
  isUpdate: false,
  isLoading: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    initialData: (state, action) => {
      state.cartItems = [...action.payload?.data];
    },
    /* ------------------------------ / add to cart ----------------------------- */
    addToCart: (state, action) => {
      const data = action?.payload;
      // check if item exist in cartItems
      const isExist = state.cartItems?.some(
        (value) => value?.item?.id === data?.id
      );
      //       add item to state
      if (!isExist) {
        state.cartItems = [
          ...state.cartItems,
          { quantity: 1,  price: data?.price ,  item: { ...data } },
        ];
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart_items: state.cartItems })
      );
    },

    /* -------------------------------remove item from cart action------------------------------------------- */
    removeItem: (state, action) => {
      const id = action?.payload?.id;
      state.cartItems = state.cartItems.filter(
        (value) => value?.item?.id !== id
      );

      localStorage.setItem(
        "cart",
        JSON.stringify({ cart_items: state.cartItems })
      );
    },
    /* --------------------------------/-remove from cart action end-------------------------------------- */
    /* -------------------------------remove item from cart action------------------------------------------- */
    removeAll: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    /* --------------------------------/-remove from cart action end-------------------------------------- */
    /* -------------------------------- increment -------------------------------- */
    increment: (state, action) => {
      const id = action.payload.id;
      const item = state.cartItems?.find((value) => value?.item?.id === id);

      item.quantity = item.quantity + 1;
      item.price = parseFloat((item.quantity * item.item.price).toFixed(3));

      localStorage.setItem(
        "cart",
        JSON.stringify({ cart_items: state.cartItems })
      );
    },
    /* -------------------------------- decrement ------------------------------- */
    decrement: (state, action) => {
      const id = action.payload.id;
      const item = state.cartItems?.find((value) => value?.item?.id === id);

      item.quantity = item.quantity - 1;
      item.price = parseFloat((item.quantity * item.item.price).toFixed(3));

      localStorage.setItem(
        "cart",
        JSON.stringify({ cart_items: state.cartItems })
      );
    },
  },

  /* ----------------------------- extra reducers ----------------------------- */
  extraReducers: (builder) => {
    builder
    .addCase( updateCart.fulfilled  ,(state , action)=>{
        state.isUpdate = true;
    })
    .addCase( updateCart.pending  ,(state , action)=>{
        state.isLoading = true;
    })
    .addCase( updateCart.rejected  ,(state , action)=>{
        state.isUpdate = false;
        state.error = action.error
    })
  },
});

export const {
  addToCart,
  removeAll,
  removeItem,
  increment,
  decrement,
  initialData,
} = cartSlice.actions;
export default cartSlice;
