import axios from 'axios';

export const api= axios.create({
    baseURL: 'https://localhost:5000/api',
})

export const askAi=(question,token)=> api.post(
    "/ai/ask",{question},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);