// import { api } from "@/utils/axiosInstance"
import axios from "axios"

export const getRestockRecordAPI = async() => {
  const response = await axios.get(`restocks/detail`)
  return response.data
}

export const addNewRecordAPI = async(data) => {
  const response = await axios.post(`restocks/addstock`, data)
  return response.data
}
