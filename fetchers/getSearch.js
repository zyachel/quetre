////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import AppError from '../utils/AppError.js';
import fetcher from './fetcher.js';
import { quetrefy } from '../utils/urlModifiers.js';

////////////////////////////////////////////////////////
//                  HELPER FUNCTIONS
////////////////////////////////////////////////////////
const topicCleaner = topic => ({
  type: 'topic',
  url: quetrefy(topic.url),
  name: topic.name,
  numFollowers: topic.numFollowers,
  image: topic.photoUrl,
  isSensitive: topic.isSensitive,
});
const spaceCleaner = space => ({
  type: 'space',
  numUsers: space.tribeUserCount,
  url: quetrefy(space.url),
  name: space.nameString,
  description: space.descriptionString,
  image: space.iconRetinaUrl,
  isSensitive: space.isSensitive,
});
const profileCleaner = profile => ({
  type: 'profile',
  credential: profile.bestCredential?.translatedString,
  isAnon: profile.isAnon,
  name: `${profile.names[0]?.givenName} ${profile.names[0]?.familyName}`,
  url: quetrefy(profile.profileUrl),
  image: profile.profileImageUrl,
  numFollowers: profile.followerCount,
  isVerified: profile.isVerified,
  isBusiness: profile.businessStatus,
  isPlusUser: profile.consumerBundleActive,
});
const questionCleaner = question => ({
  type: 'question',
  text: JSON.parse(question.title).sections,
  url: quetrefy(question.url),
  isDeleted: question.isDeleted,
  numFollowers: question.followerCount,
  creationTime: question.creationTime,
  numComments: question.numDisplayComments,
  isSensitive: question.isSensitive,
});
const answerCleaner = ({ question, previewAnswer: answer }) => ({
  type: 'answer',
  question: {
    ...questionCleaner(question),
  },
  ...(answer.originalQuestionIfDifferent && {
    originalQuestion: {
      text: JSON.parse(answer.originalQuestionIfDifferent.question.title).sections,
      url: quetrefy(answer.originalQuestionIfDifferent.question.url),
      qid: answer.originalQuestionIfDifferent.question.qid,
    },
  }),
  isViewable: !!answer.viewerHasAccess,
  text: JSON.parse(answer.content).sections,
  creationTime: answer.creationTime,
  updatedTime: answer.updatedTime,
  numComments: answer.numDisplayComments,
  numUpvotes: answer.numUpvotes,
  numViews: answer.numViews,
  numShares: answer.numShares,
  numAnswerRequests: answer.numRequesters,
  isBusinessAnswer: answer.businessAnswer,
  url: quetrefy(answer.url),
  isSensitive: answer.isSensitive,
  author: {
    uid: answer.author.uid,
    isAnon: answer.author.isAnon,
    image: answer.author.profileImageUrl,
    isVerified: answer.author.isVerified,
    isPlusUser: answer.author.consumerBundleActive,
    url: quetrefy(answer.author.profileUrl),
    name: `${answer.author.names[0].givenName} ${answer.author.names[0].familyName}`,
    credential: answer.authorCredential?.translatedString,
  },
});
const postCleaner = post => ({
  type: 'post',
  pid: post.pid,
  isViewable: post.viewerHasAccess,
  url: quetrefy(post.url),
  title: JSON.parse(post.title).sections,
  isDeleted: post.isDeleted,
  isSensitive: post.isSensitive,
  text: JSON.parse(post.content).sections,
  creationTime: post.creationTime,
  updatedTime: post.updatedTime,
  numComments: post.numDisplayComments,
  numUpvotes: post.numUpvotes,
  numViews: post.numViews,
  numShares: post.numShares,
  author: {
    uid: post.author.uid,
    isAnon: post.author.isAnon,
    image: post.author.profileImageUrl,
    isVerified: post.author.isVerified,
    isPlusUser: post.author.consumerBundleActive,
    url: quetrefy(post.author.profileUrl),
    name: `${post.author.names[0].givenName} ${post.author.names[0].familyName}`,
    credential: post.authorCredential?.translatedString,
  },
  ...(post.tribeItem && {
    space: {
      isSensitive: post.tribeItem.tribe.isSensitive,
      name: post.tribeItem.tribe.nameString,
      url: quetrefy(post.tribeItem.tribe.url),
      image: post.tribeItem.tribe.iconRetinaUrl,
      description: post.tribeItem.descriptionString,
      numFollowers: post.tribeItem.tribe.numFollowers,
    },
  }),
});

const resultsCleaner = results => {
  const cleanedResults = results.map(result => {
    const resultToClean = result.node;

    if (resultToClean.topic) return topicCleaner(resultToClean.topic);
    if (resultToClean.tribe) return spaceCleaner(resultToClean.tribe);
    if (resultToClean.post) return postCleaner(resultToClean.post);
    if (resultToClean.user) return profileCleaner(resultToClean.user);
    if (resultToClean.previewAnswer) return answerCleaner(resultToClean);
    if (resultToClean.question) return questionCleaner(resultToClean.question);

    return {};
  });

  return cleanedResults;
};

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const KEYWORD = 'searchConnection';

const getSearch = async (querySlug, lang) => {
  const options = { keyword: KEYWORD, lang, toEncode: false };
  const res = await fetcher(`search/${querySlug}`, options);

  const {
    data: { [KEYWORD]: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError(
      "Search couldn't be done. Recheck the URL, or resend the request if you believe the URL is correct.",
      404
    );

  const data = {
    results: resultsCleaner(rawData.edges),
  };

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getSearch;
