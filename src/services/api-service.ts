import axios from "axios";

const BASE_URL = "https://swdprojectapi.azurewebsites.net/";

export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/authentication/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/authentication/login`, {
      email,
      password,
    });
    console.log(response.data);
    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/get-all-products`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const addToCart = async (accountId, productId, quantity, price) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/api/carts/create-cart`,
      [
        {
          accountId,
          productId,
          quantity,
          price,
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCart = async (cartItems) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${BASE_URL}/api/carts/update-cart`,
      cartItems,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const getUserCart = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/carts/get-user-cart`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
};

export const removeItemsFromCart = async (itemIds) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/carts/remove-items-in-cart`,
      [itemIds]
    );
    return response.data;
  } catch (error) {
    console.error("Error removing items from cart:", error);
    throw error;
  }
};

export const updateProduct = async (productData, accessToken) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/products/update-product`,
      productData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const createProduct = async (productData, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/products/create-product`,
      productData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/categories/get-all-categories`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const deleteProduct = async (id, accessToken) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/products/delete-product/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const createCategory = async (categoryData, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/categories/create-category`,
      categoryData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/categories/update-category`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders/get-orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getAccounts = async (params, body) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/accounts/get-accounts`,
      body,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const updateAccount = async (accountData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/accounts/update-account`,
      accountData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, staffId = 37, status) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/orders/update-order-status`,
      {
        params: { orderId, staffId, status },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const confirmDeliveredOrder = async (orderId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/orders/confirm-delivered-order`,
      {
        params: { orderId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming delivery:", error);
    throw error;
  }
};

export const getAccountById = async (accountId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${BASE_URL}/api/accounts/get-account-by-id`,
      {
        params: { accountId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const getTopSellingProducts = async (topN) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/top-selling`, {
      params: { topN },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    throw error;
  }
};

export const filterProductsByAge = async (age) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/filter-by-age/${age}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by age:", error);
    throw error;
  }
};

export const filterProductsByBrand = async (brand) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/filter-by-brand/${brand}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error;
  }
};

export const filterProductsByOrigin = async (origin) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/filter-by-origin/${origin}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by origin:", error);
    throw error;
  }
};

export const filterProductsBySize = async (size) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/filter-by-size/${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by size:", error);
    throw error;
  }
};

export const filterProductsByCapacity = async (capacity) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/filter-by-capacity/${capacity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by capacity:", error);
    throw error;
  }
};

export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/search-products`,
      {
        params: { keyword },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
