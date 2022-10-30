/* eslint-disable no-useless-catch */
////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import * as cheerio from 'cheerio';
import axiosInstance from '../utils/axiosInstance.js';
import AppError from '../utils/AppError.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
/**
 *
 * @param {string} resourceStr a string after the baseURL
 * @param {string} keyword
 * @param {boolean}} toEncode
 * @returns JSON containing the result
 * @description makes a call to quora.com(with the resourceStr appended) and returns parsed JSON containing the data about the resource requested.
 * @example await fetcher('What-is-free-and-open-software'); // will return object containing answers
 * await fetcher('topic/Space-Physics'); // will return 'space physics' topic object
 * await fetcher('profile/Charlie-Cheever'); // will return object containing information about charlie cheever
 */
const fetcher = async (resourceStr, keyword = '', toEncode = true) => {
  try {
    // as url might contain unescaped chars. so, encoding it right away
    const str = toEncode ? encodeURIComponent(resourceStr) : resourceStr;
    const res = await axiosInstance.get(str);

    const $ = cheerio.load(res.data);

    const regex = new RegExp(`"{\\\\"data\\\\":\\{\\\\"${keyword}.*\\}"`); // equivalent to /"\{\\"data\\":\{\\"searchConnection.*\}"/

    let rawData;
    $('body script').each((i, el) => {
      const extractedVal = $(el).html().match(regex)?.[0];

      if (extractedVal) {
        rawData = extractedVal;
        return false; // breaks loop
      }
      return true;
    });

    if (!rawData || !Object.entries(rawData).length)
      throw new AppError("couldn't retrieve data", 500);

    return JSON.parse(rawData);
  } catch (err) {
    const statusCode = err.response?.status;
    if (statusCode === 404) throw new AppError('Not found', 404);
    else if (statusCode === 429 || statusCode === 403)
      throw new AppError(
        'Quora is rate limiting this instance. Try another or host your own.',
        503
      );
    else throw err;
  }
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default fetcher;
