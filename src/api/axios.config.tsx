import axios, { AxiosInstance } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { AuthService } from './auth.service';

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

// axiosInstance.interceptors.request.use(async (config) => {
//   if (typeof window !== 'undefined') {
//     const session = await getSession(); // Получаем объект сессии с клиента
//     if (session?.user.accessToken) {
//       config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
//     }
//   }

//   return config;
// });

axiosInstance.interceptors.request.use(async (config) => {
	const session = await getSession()
	if (config.headers && session?.user.accessToken)
		config.headers.Authorization = `Bearer ${session?.user.accessToken}`
	return config
})

axiosInstance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
    console.log('error', error)
		if (
			error.response &&
			error.response.status === 403 &&
			originalRequest &&
			!originalRequest.sent
		) {
			originalRequest.sent = true
			try {
				const {accessToken} = await AuthService.refresh()
        console.log(accessToken)
				return axiosInstance.request(originalRequest)
			} catch (e) {
				signOut()
			}
		}

		throw error
	}
)


export default axiosInstance;
