////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////

/**
 * some routes are accidentally thought of as slug for answered question. filtering those here.
 */
export const nonSlugRoutes = [
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'icon.svg',
];

/**
 * array of languages supported.
 *
 * see {@link https://help.quora.com/hc/en-us/articles/360015662751-What-languages-does-Quora-support- this help question} and {@link https://loc.gov/standards/iso639-2/ISO-639-2_utf-8.txt this list} for more.
 *
 */
export const acceptedLanguages = [
  'en', // English
  'es', // Spanish
  'fr', // French
  'de', // German
  'it', // Italian
  'jp', // Japanese
  'id', // Indonesian
  'pt', // Portuguese
  'hi', // Hindi
  'nl', // Dutch
  'da', // Danish
  'fi', // Finnish
  'nb', // Norwegian
  'sv', // Swedish
  'mr', // Marathi
  'bn', // Bengali
  'ta', // Tamil
  'ar', // Arabic
  'he', // Hebrew
  'gu', // Gujarati
  'kn', // Kannada
  'ml', // Malayalam
  'te', // Telugu
  'po', // Polish
];
