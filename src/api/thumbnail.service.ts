import { axiosInstance as axios } from './axios.config'
import { objToFormData } from 'utils/formData'

const endpoint = '/thumbnail'

export const ThumbnailServices = {
  findAll: async () => {
    try {
      const response = await axios.get(`${endpoint}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  findOne: async (id: number) => {
    try {
      const response = await axios.get(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  create: async (data: IThumbnail) => {
    try {
      console.log(data)
      const response = await axios.post(`${endpoint}`, objToFormData(data), {
       headers: {
        "Content-Type": 'multipart/form-data'
       }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
  update: async (id: number, data: IThumbnail) => {
    try {
      const response = await axios.patch(`${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
