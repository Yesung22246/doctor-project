// api.js
import axios from "axios";

// ======================
// CONFIG
// ======================

const BASE_URL = "http://localhost:5000/api";

// ======================
// AXIOS INSTANCE
// ======================

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// TOKEN
// ======================

// Lấy token từ localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Tự động gắn token vào header
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================
// HANDLE RESPONSE
// ======================

const handleResponse = async (request) => {
  try {
    const response = await request;

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra",
      data: error.response?.data || null,
    };
  }
};

// ======================
// METHODS
// ======================

// GET
export const getData = async ({
  url = "",
  params = {},
  headers = {},
}) => {
  return handleResponse(
    api.get(BASE_URL + url, {
      params,
      headers,
    })
  );
};

// POST
export const postData = async ({
  url = "",
  data = {},
  headers = {},
}) => {
  return handleResponse(
    api.post(BASE_URL + url, data, {
      headers,
    })
  );
};

// PUT
export const putData = async ({
  url = "",
  data = {},
  headers = {},
}) => {
  return handleResponse(
    api.put(BASE_URL + url, data, {
      headers,
    })
  );
};

// DELETE
export const deleteData = async ({
  url = "",
  params = {},
  headers = {},
}) => {
  return handleResponse(
    api.delete(BASE_URL + url, {
      params,
      headers,
    })
  );
};