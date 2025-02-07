// import { api } from "@/utils/axiosInstance"
import axios from "axios"

export const getRestockRecordAPI = async() => {
  const response = await axios.get(`api/restock`)
  return response.data
}

export const addNewRecordAPI = async(data) => {
  const response = await axios.post(`api/addstock`, data)
  return response.data
}
