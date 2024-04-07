const invalidLessThan = /\\x3C/g;
const validLessThan = '\\u003C';

/**
 * parses and corrects invalid escape sequences
 *  @param {string} data
 * @returns {Record<PropertyKey, any>}
 */
const parse = data => JSON.parse(data.replace(invalidLessThan, validLessThan));

export default parse;
