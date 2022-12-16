import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
    });
    return data;
  } catch (error) {
    return response.data.error.message;
  }
};
export const saveAddress = async (address, userId) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      userId,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/manageAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const applyCoupon = async (coupon) => {
  const { data } = await axios.post("/api/user/applyCoupon", {
    coupon,
  });
  return data;
};
