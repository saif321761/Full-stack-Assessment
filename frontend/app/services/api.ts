import axios from "axios";

const API_URL = "http://localhost:8000";

export interface Product {
  id: number;
  name: string;
  category: string;  // Add this
  price: number;
  stock: number;     // Add this
  // Remove description since it doesn't exist in your database
  [key: string]: any; 
}

export const fetchItems = async (
  page: number = 1,
  limit: number = 50,
  sort: string = "id",
  filter: string = "",
  order: string = "asc"
): Promise<Product[]> => {
  try {
    console.log(`Making API call: ${API_URL}/products/?page=${page}&limit=${limit}&sort=${sort}&filter=${filter}&order=${order}`);
    
    const res = await axios.get(`${API_URL}/products/`, {
      params: { 
        page: page,
        limit: limit, 
        sort: sort, 
        filter: filter,
        order: order 
      },
    });
    
    console.log(`API response received: ${res.data.length} items`);
    return res.data;
    
  } catch (error: any) {
    console.error("API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
  }
};

// Fetch single product
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};