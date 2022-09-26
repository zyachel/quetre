/* eslint-disable no-useless-catch */
////////////////////////////////////////////////////////
//                      IMPORTS
////////////////////////////////////////////////////////
import * as cheerio from 'cheerio';
import axiosInstance from '../utils/axiosInstance.js';
import AppError from '../utils/AppError.js';
import { basename } from '../utils/misc.js'

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
/**
 *
 * @param {string} resourceStr a string after the baseURL
 * @returns JSON containing the result
 * @description makes a call to quora.com(with the resourceStr appended) and returns parsed JSON containing the data about the resource requested.
 * @example await fetcher('What-is-free-and-open-software'); // will return object containing answers
 * await fetcher('topic/Space-Physics'); // will return 'space physics' topic object
 * await fetcher('profile/Charlie-Cheever'); // will return object containing information about charlie cheever
 */
const fetcher = async resourceStr => {
  try {
    // as url might contain unescaped chars. so, encodeing it right away
    const res = await axiosInstance.get(encodeURIComponent(resourceStr));

    const $ = cheerio.load(res.data);

    // this logic is prone to breakage as Quora changes position of the script that includes answers.
    // Cur position: 4th from bottom.
    const rawData = $('body script:nth-last-child(4)')
      .html()
      ?.match(/"\{.*\}"/m)?.[0];

    if (!rawData || !Object.entries(rawData).length)
      throw new AppError("couldn't retrieve data", 500);

    const data = JSON.parse(rawData);

    return data;
  } catch (err) {
    if (err.response?.status === 404) throw new AppError('Not found', 404);
    else if (err.response?.status === 429)
      throw new AppError(
        'Quora is rate limiting this instance. Consider hosting your own. Instructions are at Github',
        503
      );
    else throw err;
  }
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default fetcher;

if (process.argv.length == 3 && basename(process.argv[1]) == 'fetcher.js') {
  console.log(await fetcher(process.argv[2]))
}
