import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { acceptedLanguages } from '../utils/constants.js';
import getAnswers from '../fetchers/getAnswers.js';
import getTopic from '../fetchers/getTopic.js';
import getProfile from '../fetchers/getProfile.js';

export const answers = catchAsyncErrors(async (req, res, next) => {
  const { params: { slug }, query: { lang } } = req;

  /** @type{Awaited<ReturnType<typeof getAnswers>>} */
  let data = res.locals.data;
  if (!data) data = await getAnswers(slug, lang);

  const title = data.question.text[0].spans.map(span => span.text).join('');

  res.locals.data = data;
  res.locals.title = title;
  res.locals.description = `Answers to ${title}`;

  next();
});

export const topic = catchAsyncErrors(async (req, res, next) => {
  const { params: { slug }, query: { lang } } = req;

  /** @type{Awaited<ReturnType<typeof getTopic>>} */
  let data = res.locals.data;
  if (!data) data = await getTopic(slug, lang);

  res.locals.data = data;
  res.locals.title = data.name;
  res.locals.description = `Information about ${data.name} topic.`;

  next();
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  const { params: { name }, query: { lang } } = req;

  /** @type{Awaited<ReturnType<typeof getProfile>>} */
  let data = res.locals.data;
  if (!data) data = await getProfile(name, lang);

  res.locals.data = data;
  res.locals.title = data.basic.name;
  res.locals.description = `${data.basic.name}'s profile.`;

  next();
});

const regex = /^https:\/\/(.{2,})\.quora\.com(\/.*)$/; // local helper constant
export const redirect = (req, res, _next) => {
  const url = req.originalUrl.replace('/redirect/', ''); // removing `/redirect/` part.
  const match = regex.exec(url);

  if (!match) return res.redirect('/');

  const [_, subdomain, rest] = match; // eg: subdomain: 'es', rest: '/topic/linux?share=1'
  let link;

  if (acceptedLanguages.includes(subdomain))
    // adding lang param
    link = `${rest}${rest.includes('?') ? '&' : '?'}lang=${subdomain}`;
  else if (subdomain === 'www')
    link = rest; // doing nothing
  else link = `/space/${subdomain}${rest}`; // gotta be a space url.

  return res.redirect(link);
};
