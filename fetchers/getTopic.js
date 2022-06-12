////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import AppError from '../utils/AppError.js';
import fetcher from './fetcher.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const getTopic = async slug => {
  // getting data and destructuring it in case it exists, else throwing an error
  const res = await fetcher(`topic/${slug}`);

  const {
    data: { topic: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError("couldn't find such a topic. Maybe check the URL?", 400);

  const data = {
    tid: rawData.tid,
    name: rawData.name,
    url: rawData.url,
    image: rawData.photoUrl,
    aliases: rawData.aliases,
    numFollowers: rawData.numFollowers,
    numQuestions: rawData.numQuestions,
    // isLocked: rawData.isLocked,
    isAdult: rawData.adult,
    mostViewedAuthors: rawData.mostViewedAuthors.map(author => ({
      uid: author.user.uid,
      name: `${author.user.names[0].givenName} ${author.user.names[0].familyName}`,
      profile: author.user.profileUrl,
      avatar: author.user.profileImageUrl,
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
      url: topic.url,
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
