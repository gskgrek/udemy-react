import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-fd94e.firebaseio.com/',
});

export default instance;