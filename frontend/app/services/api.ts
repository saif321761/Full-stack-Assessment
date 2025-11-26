import axios from "axios";

// backend url
const API_URL = "http://localhost:9000";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  [key: string]: any; 
}

export const fetchItems = async (
  page: number,
  limit: number,
  sort: string,
  filter: string
): Promise<Product[]> => {
  try {
    const res = await axios.get(`${API_URL}/products`, {
      params: { page, limit, sort, filter },
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
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
