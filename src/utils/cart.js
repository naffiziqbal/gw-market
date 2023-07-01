
export const convertCartItemDataForAPI = (getData) => {
  if (getData) {
    return getData?.map((value) => ({
      item: value?.item?.id,
      quantity: value?.quantity,
    }));
  }
  return null;
};



export const updateCartDataStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify({ ...data }));
};
