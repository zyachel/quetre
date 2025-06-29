const getLang = urlObj => urlObj.searchParams.get('lang') || 'en';
const formatSlug = (slug, charToRemove) =>
  slug.replace(charToRemove, '').toLowerCase();

/** @param {URL} urlObj */
export const answersKey = urlObj => {
  const slug = formatSlug(urlObj.pathname, '/');
  const lang = getLang(urlObj);

  return `answers:${slug}&lang=${lang}`;
};

/** @param {URL} urlObj */
export const topicKey = urlObj => {
  const slug = formatSlug(urlObj.pathname, '/topic/');
  const lang = getLang(urlObj);

  return `topic:${slug}&lang=${lang}`;
};

/** @param {URL} urlObj */
export const profileKey = urlObj => {
  const slug = formatSlug(urlObj.pathname, '/profile/');
  const lang = getLang(urlObj);

  return `profile:${slug}&lang=${lang}`;
};
