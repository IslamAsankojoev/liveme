import { axiosInstance as axios } from './axios.config';
const endpoint = '/category'

export const CategoryService = {
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
  create: async (data: ICategory) => {
    try {
      const response = await axios.post(`${endpoint}`, data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (id: number, data: ICategory) => {
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
  },
}