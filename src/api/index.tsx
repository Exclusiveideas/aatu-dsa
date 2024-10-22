import { loginData } from '@/types/auth';
import axios from 'axios';

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URI})

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })


// export const fetchPosts = () => API.get('/posts');
// export const createPost = (newPost: any) => API.post('/posts', newPost);
// export const updatePost = (id: any, updatedPost: any) => API.patch(`/posts/${id}`, updatedPost)
// export const deletePost = (id: any) => API.delete(`/posts/${id}`)
// export const likePost = (id: any) => API.patch(`/posts/${id}/likePost`)

export const signIn = async (formData: loginData) => {
    try {
        const user = await API.post('/auth/login', formData)
        return { status: 200, user }
    } catch (err: any) {
        console.log("err: ", err)
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem logging user to the server - Try again.'
        }
    }
    
}


export const signUp = async (formData: any) => {
    try {
        const user = await API.post('/auth/register', formData)
        return { status: 200, user }
    } catch (err: any) {
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem registering user to the server - Try again.'
        }
    }
    
}

export const resetPassword = async (resetPassDetails: any) => {

    try {
        const { status } = await API.patch('/auth/resetPass', resetPassDetails)
        return { status }
    } catch (err: any) {
        console.log('err: ', err)
        return {
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || err?.message || 'Problem resetting your password - Try again.'
        }
    }
    
}