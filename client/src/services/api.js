import axios from 'axios'

axios.defaults.baseURL ="http://localhost:5000/api/v1"

export const login = async (userDetails)=> await axios.post('/auth/login',userDetails)

export const register = async (userDetails)=> await axios.post('/auth/register',userDetails)

export const passwordReset = async (email)=> await axios.post('/auth/forgotPassword', email)

export const getBootcampList = async ()=> await axios.get('/bootcamps')