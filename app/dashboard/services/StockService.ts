import axios from "axios";

const API_URL = "http://localhost:8000/stocks"; 

export const StockService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  addStock: async (stockData: {
    stock_id: string;
    quantite: number;
    unite: string;
    nomS: string;
    categorie: string;
    niveau: string;
    action: string;
  }) => {
    const response = await axios.post(API_URL, stockData);
    return response.data;
  },
};
