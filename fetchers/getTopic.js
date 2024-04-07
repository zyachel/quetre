////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import AppError from '../utils/AppError.js';
import { quetrefy } from '../utils/urlModifiers.js';
import fetcher from './fetcher.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////

const KEYWORD = 'topic';

const getTopic = async (slug, lang) => {
  // getting data and destructuring it in case it exists, else throwing an error
  const res = await fetcher(`topic/${slug}`, { keyword: KEYWORD, lang });

  const {
    data: { [KEYWORD]: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError(
      "Topic details couldn't be fetched. Recheck the URL, or resend the request if you believe the URL is correct.",
      404
    );

const data = {
  tid: rawData.tid,
  name: rawData.name,
  url: quetrefy(rawData.url),
  image: rawData.photoUrl,
  // isLocked: rawData.isLocked,
  isAdult: rawData.adult,
  mostViewedAuthors: rawData.mostViewedAuthors.map(author => ({
    uid: author.user.uid,
    name: `${author.user.names[0].givenName} ${author.user.names[0].familyName}`,
    profile: quetrefy(author.user.profileUrl),
    image: author.user.profileImageUrl,
    isAnon: author.user.isAnon,
    isVerified: author.user.isVerified,
    numFollowers: author.user.followerCount,
    numViews: author.numViews,
    numAnswers: author.numPublicMostViewedAnswers,
    credential: author.user.bestCredential?.translatedString,
  })),
  relatedTopics: rawData.relatedTopics.map(topic => ({
    tid: topic.tid,
    name: topic.name,
    url: quetrefy(topic.url),
    image: topic.photoUrl,
    numFollowers: topic.numFollowers,
  })),
};

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getTopic;
