import axios from "axios";
import { user } from "../interface/user";

const apiBaseURL = "http://localhost:3000/users";

const getAllUsers = async () => {
  try {
    return await axios.get(apiBaseURL);
  } catch (error: any) {
    console.error("Error fetching all users:", error.response ? error.response : error);
    throw error;
  }
};

const createUser = async (username: string) => {
  try {
    return await axios.post(`${apiBaseURL}/register`, { username });
  } catch (error: any) {
    console.error("Error creating user:", error.response ? error.response : error);
    throw error;
  }
};

const loginUser = async (username: string) => {
  try {
    return await axios.post(`${apiBaseURL}/login`, { username });
  } catch (error: any) {
    console.error("Error logging in user:", error.response ? error.response : error);
    throw error;
  }
};

const fetchUserScore = async (username: string): Promise<user> => {
  try {
    const response = await axios.get(`${apiBaseURL}/${username}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user score:", error.response ? error.response : error);
    throw error;
  }
};

const updateUser = async (username: string, points: number, clickPower: number) => {
  try {
    return await axios.put("http://localhost:3000/users/update", { username, points, clickPower });
  } catch (error: any) {
    console.error("Error updating user:", error.response ? error.response : error);
    throw error;
  }
};

export { getAllUsers, createUser, loginUser, fetchUserScore, updateUser };
