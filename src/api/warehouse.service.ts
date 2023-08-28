import { axiosInstance as axios } from './axios.config';
const endpoint = '/warhouse'

export const WarehouseService = {
  findAll: async () => {
    try {
      const response = await axios.get(`${endpoint}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number) => {
    try {
      const response = await axios.get(`${endpoint}/${id}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: IWarehouse) => {
    try {
      const response = await axios.post(`${endpoint}`, data)
      return response.data;
    } catch (error) {
      throw error;
    } 
  },
  update: async (id: number, data: IWarehouse) => {
    try {
      const response = await axios.put(`${endpoint}/${id}`, data)
      return response.data;
    } catch (error) {
      throw error;
    } 
  },
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${endpoint}/${id}`)
      return response.data;
    } catch (error) {
      throw error;
    } 
  }
}