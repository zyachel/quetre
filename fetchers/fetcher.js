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
    let rawData;
    $('body')
      .children('script')
      .each((i, el) => {
        if ($(el).html() === 'window.installSettings();')
          rawData = $(el)
            .next()
            .html()
            ?.match(/"\{.*\}"/m)?.[0];
      });
    if (!rawData) throw new Error("couldn't retrieve data");

    const data = JSON.parse(rawData);

    return data;
  } catch (err) {
    if (err.response.status === 404) throw new AppError('Not found', 404);
    else throw err;
  }
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default fetcher;
