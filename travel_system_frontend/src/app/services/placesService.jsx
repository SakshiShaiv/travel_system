import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const getPlaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/places`);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};
