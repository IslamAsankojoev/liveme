import { axiosInstance as axios } from './axios.config';
const endpoint = '/product'

export const ProductServices = {
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
  create: async (data: IProduct) => {
    try {
      const response = await axios.post(`${endpoint}`, data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, data: IProduct) => {
    try {
      const response = await axios.patch(`${endpoint}/${id}`, data)
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