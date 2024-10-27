import { loginData } from '@/types/auth';
import axios from 'axios';

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URI});




export const fetchStudentData = async (matric: string) => {
    
    if(!matric) return

    try {
        const student = await API.get(`/student/fetchStudent?matric=${matric}`)
        return { status: 200, student }
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem logging user to the server - Try again.'
        }
    }
}



export const signIn = async (formData: loginData) => {
    try {
        const user = await API.post('/auth/login', formData)
        return { status: 200, user }
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem logging user to the server - Try again.'
        }
    }
    
}


export const signUp = async (formData) => {
    try {
        const user = await API.post('/auth/register', formData)
        return { status: 200, user }
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem registering user to the server - Try again.'
        }
    }
    
}

export const resetPassword = async (resetPassDetails) => {

    try {
        const { status } = await API.patch('/auth/resetPass', resetPassDetails)
        return { status }
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem resetting your password - Try again.'
        }
    }
    
}


export const updateStdPassport = async (updatePassportDet) => {

    try {
        const { status } = await API.patch('/student/updatePassport', updatePassportDet);
        return { status }
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem resetting your password - Try again.'
        }
    }
    
}

export const submitOyshiaForm = async (OyshiaForm) => {

    try {
        const result = await API.patch('/student/submitOyshia', OyshiaForm);
        return { status: 200, data: result?.data}
    } catch (err) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem submitting your OYSHIA details - Try again.'
        }
    }
    
}