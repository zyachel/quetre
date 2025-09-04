const hexEscapeSequence = /\\x([0-9A-Fa-f]{2})/g;
const unicodeEscapeSequence = String.raw`\u00$1`;

/**
 * parses and corrects invalid escape sequences
 *  @param {string} data
 * @returns {Record<PropertyKey, unknown>}
 */
const parse = data => JSON.parse(data.replace(hexEscapeSequence, unicodeEscapeSequence));

export default parse;
