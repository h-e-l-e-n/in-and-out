// import { api } from "@/utils/axiosInstance"
import axios from "axios"

export const getRestockRecordAPI = async() => {
  const response = await axios.get(`api/restock`)
  return response.data

}
