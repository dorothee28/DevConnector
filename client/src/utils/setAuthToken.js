import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.hearders.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auh-token'];
    }
}

export default setAuthToken;