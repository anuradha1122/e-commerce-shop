import axios from "axios";

const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = 'https://beauty.lms.lk/eshopping-backend-A/';
        break;
      case 'development':
      default:
        url = 'http://localhost/eshopping-backend-A/';
    }
  
    return url;
  }

  let headers = {};
   if(localStorage.accessToken){
      headers.Authorization = `Bearer ${localStorage.accessToken}`;
   };

  const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    //timeout: 10000,
    headers,
    });

  export default axiosInstance;