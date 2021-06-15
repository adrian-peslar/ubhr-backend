import axios from 'axios';

export default async (userData) => {
    return await axios.post('/api/auth/login', userData);
};
