import axios from 'axios';


const instance = axios.create({
    baseURL:'https://burger-app-f1fd6.firebaseio.com/'
});

export default instance;