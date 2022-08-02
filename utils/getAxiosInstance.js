////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import axios from 'axios';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
/**
 * @description an axios instance having base url already set
 * @param {string} lang language to use. default is english. 
 * @returns AxiosInstance
 */
const getAxiosInstance = (subdomain = 'www') =>
  axios.create({
    baseURL: `https://${subdomain}.quora.com`,
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
export default getAxiosInstance;
