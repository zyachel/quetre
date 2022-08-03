
const reformatRelatedUrl = (url) => {
  // extract the lang and question properties from url
  let lang = url.substring(url.indexOf('://'), url.indexOf('.quora.com'));
  let question = url.substring(url.indexOf('quora.com'));

  lang = lang.replace('://', '');
  question = question.replace('quora.com', '');

  if (lang.length <= 1) {
    lang = 'en';
  }

  return `${question}?lang=${lang}`;
};

export default reformatRelatedUrl;
