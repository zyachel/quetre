////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import AppError from '../utils/AppError.js';
import { quetrefy } from '../utils/urlModifiers.js';
import fetcher from './fetcher.js';

////////////////////////////////////////////////////////
//                  HELPER FUNCTIONS
////////////////////////////////////////////////////////

// clean specific types of feed
const feedAnswerCleaner = answer => ({
  type: 'answer',
  isPinned: answer.isPinned,
  aid: answer.aid,
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
  author: {
    uid: answer.author.uid,
    isAnon: answer.author.isAnon,
    image: answer.author.profileImageUrl,
    isVerified: answer.author.isVerified,
    url: quetrefy(answer.author.profileUrl),
    name: `${answer.author.names[0].givenName} ${answer.author.names[0].familyName}`,
    credential: answer.authorCredential?.translatedString,
    // additionalCredentials: answer?.credibilityFacts.map(),
  },
  question: {
    text: JSON.parse(answer.question.title).sections,
    url: quetrefy(answer.question.url),
    qid: answer.question.qid,
    isDeleted: answer.question.isDeleted,
  },
});
const feedPostCleaner = post => ({
  type: 'post',
  isPinned: post.isPinned,
  pid: post.pid,
  isViewable: post.viewerHasAccess,
  url: quetrefy(post.url),
  title: JSON.parse(post.title).sections,
  isDeleted: post.isDeleted,
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
      name: post.tribeItem.tribe.nameString,
      url: quetrefy(post.tribeItem.tribe.url),
      image: post.tribeItem.tribe.iconRetinaUrl,
      description: post.tribeItem.descriptionString,
      numFollowers: post.tribeItem.tribe.numFollowers,
    },
  }),
});
const feedQuestionCleaner = question => ({
  type: 'question',
  text: JSON.parse(question.title).sections,
  qid: question.qid,
  url: quetrefy(question.url),
  isDeleted: question.isDeleted,
  numFollowers: question.followerCount,
  creationTime: question.creationTime,
  numComments: question.numDisplayComments,
  numAnswers: question.answerCount,
  lastFollowTime: question.lastFollowTime,
});

// takes feed from getProfile and passes them onto above helpers for cleansing.
const feedCleaner = feed => {
  const cleanFeed = feed.map(feedItem => {
    if (feedItem.node.answer) return feedAnswerCleaner(feedItem.node.answer);
    if (feedItem.node.question)
      return feedQuestionCleaner(feedItem.node.question);
    if (feedItem.node.post) return feedPostCleaner(feedItem.node.post);

    return [];
  });

  return cleanFeed.filter(feedItem => feedItem.type);
};

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const KEYWORD = 'user';

const getProfile = async (slug, lang) => {
  // getting data and destructuring it in case it exists
  const res = await fetcher(`profile/${slug}`, { keyword: KEYWORD, lang });

  const {
    data: { [KEYWORD]: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError(
      "Profile couldn't be fetched. Recheck the URL, or resend the request if you believe the URL is correct.",
      404
    );

  // main data object to be returned
  const data = {
    basic: {
      uid: rawData.uid,
      image: rawData.profileImageUrl,
      name: `${rawData.names[0].givenName} ${rawData.names[0].familyName}`,
      profile: quetrefy(rawData.profileUrl),
      isDeceased: rawData.isDeceased,
      isBusiness: rawData.businessStatus,
      isBot: rawData.isUserBot,
      isBanned: rawData.isUserBanned,
      isDeactivated: rawData.deactivated,
      isDeleted: rawData.isDeleted,
      isAnon: rawData.isAnon,
      isVerified: rawData.isVerified,
      isPlusUser: rawData.consumerBundleActive,
      twitterUsername: rawData.twitterScreenName,
      numFollowers: rawData.followerCount,
      numFollowing: rawData.followingCount,
      numAnswers: rawData.numPublicAnswers,
      numQuestions: rawData.numProfileQuestions,
      numPosts: rawData.postsCount,
    },
    highlights: {
      creationTime: rawData.creationTime,
      numAnswerViews: rawData.allTimePublicContentViews,
      numLastMonthAnswerViews: rawData.lastMonthPublicContentViews,
      topWriterYears: rawData.topWriterYears.join(', '),
      PublishedWriterIn: rawData.publishers
        .map(obj => obj.publisherName)
        .join(', '),
      publishedAnswersUrl: rawData.publishedUrl,
      topAskerYears: rawData.topAskerYears.join(', '),
    },
    credentials: {
      mainCredential: rawData.profileCredential?.experience,
      languageCredential: rawData.languageCredentials[0]?.language.name,
      ...(rawData.workCredentials[0] && {
        workCredential: {
          position: rawData.workCredentials[0].position,
          company: rawData.workCredentials[0].company?.name,
          startYear: rawData.workCredentials[0].startYear,
          endYear: rawData.workCredentials[0].endYear,
        },
      }),
      ...(rawData.schoolCredentials[0] && {
        schoolCredential: {
          degree: rawData.schoolCredentials[0].degree,
          school: rawData.schoolCredentials[0].school?.name,
          major: rawData.schoolCredentials[0].concentration?.name,
        },
      }),
      ...(rawData.locationCredentials[0] && {
        locationCredential: {
          location: rawData.locationCredentials[0].location?.name,
          startYear: rawData.locationCredentials[0].startYear,
          endYear: rawData.locationCredentials[0].endYear,
        },
      }),
    },
    spaces: {
      numActiveInSpaces: rawData.numCanContributeTribes,
      spaces: rawData.followingTribesConnection.edges.map(space => ({
        numItems: space.node.numItemsOfUser,
        url: quetrefy(space.node.url),
        name: space.node.nameString,
        image: space.node.iconRetinaUrl,
        isSensitive: space.node.isSensitive,
      })),
    },
    topics: {
      topics: rawData.expertiseTopicsConnection.edges.map(topic => ({
        name: topic.node.name,
        url: quetrefy(topic.node.url),
        isSensitive: topic.node.isSensitive,
        numFollowers: topic.node.numFollowers,
        image: topic.node.photoUrl,
        numAnswers: topic.node.numPublicAnswersOfUser,
      })),
    },
    profileFeed: {
      description: JSON.parse(
        rawData.descriptionQtextDocument?.legacyJson || '{}'
      )?.sections,
      feed: feedCleaner(rawData.combinedProfileFeedConnection.edges),
    },
  };

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getProfile;
