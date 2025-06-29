/* eslint-disable import/prefer-default-export */
import { acceptedLanguages } from './constants.js';

/**
 * modifies link to be quetre-friendly.
 * @param {string} url the quora url to transform. could be relative or absolute
 */
export const quetrefy = url => {
  try {
    const link = new URL(url);
    const subdomain = link.hostname.split('.')[0];
    // normal url
    if (subdomain === 'www') return link.pathname;
    // lang specific route
    if (acceptedLanguages.includes(subdomain))
      return `${link.pathname}?lang=${subdomain}`;
    // must be spaces link
    return `/space/${subdomain}${link.pathname}`;
  } catch {
    // must be a relative url
    return url;
  }
};

/**
 * @param {import('express').Request['query']} queryParams
 * @returns {Record<string, string>}
 */
export const getValidQueryParams = queryParams => {
  /** @type {Record<string, string>} */
  const validParams = {};
  for (const key in queryParams) {
    if (Object.hasOwn(queryParams, key)) {
      const value = queryParams[key];
      const finalValue = Array.isArray(value) ? value.find(Boolean) : value;
      if (!finalValue) continue;

      validParams[key] = finalValue;
    }
  }

  return validParams;
};
