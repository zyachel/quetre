////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import axios from 'axios';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
/**
 * @description an axios instance having base url already set
 */
const axiosInstance = axios.create({
  baseURL: 'https://www.quora.com',
  // conditionally adding headers to the request config using ES6 spreading and short-circuiting
  headers: {
    ...(process.env.AXIOS_USER_AGENT && {
      'User-Agent': process.env.AXIOS_USER_AGENT,
    }),
    ...(process.env.ACCEPT && {
      Accept: process.env.ACCEPT,
    }),
  },
});

////////////////////////////////////////////////////////
//                      EXPORTS
////////////////////////////////////////////////////////
export default axiosInstance;
