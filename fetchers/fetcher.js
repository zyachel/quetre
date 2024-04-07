/* eslint-disable no-useless-catch */
////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import * as cheerio from 'cheerio';
import getAxiosInstance from '../utils/getAxiosInstance.js';
import AppError from '../utils/AppError.js';
import parse from '../utils/parse.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
/**
 * makes a call to quora.com(with the resourceStr appended) and returns parsed JSON containing the data about the resource requested.
 * @param {string} resourceStr a string after the baseURL
 * @param {{keyword: string, lang?: string, toEncode?: boolean}} options additional options
 * @returns JSON containing the result
 * @example await fetcher('What-is-free-and-open-software'); // will return object containing answers
 * await fetcher('topic/Space-Physics'); // will return 'space physics' topic object
 * await fetcher('profile/Charlie-Cheever'); // will return object containing information about charlie cheever
 */
const fetcher = async (resourceStr, { keyword, lang, toEncode = true }) => {
  try {
    // as url might contain unescaped chars. so, encoding it right away
    const str = toEncode ? encodeURIComponent(resourceStr) : resourceStr;
    const axiosInstance = getAxiosInstance(lang);
    const res = await axiosInstance.get(str);

    const $ = cheerio.load(res.data);

    const regex = new RegExp(String.raw`"{\\"data\\":\{\\"${keyword}.*?\}"`);

    let rawData;
    $('body script').each((i, el) => {
      const extractedVal = $(el).html().match(regex)?.[0];

      if (extractedVal) {
        rawData = extractedVal;
        return false; // breaks loop
      }
      return true;
    });

    if (!rawData) throw new AppError("couldn't retrieve data", 500);

    return parse(rawData);
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
