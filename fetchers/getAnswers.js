////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
import { quetrefy } from '../utils/urlModifiers.js';
import answersFetcher from './answersFetcher.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const getAnswers = async (slug, lang) => {
  // getting data and destructuring it in case it exists
  const rawData = await answersFetcher(slug, lang);

  // array containing all the answers with metadata
  const ansArr = rawData.answers.map(answer => ({
    text: JSON.parse(answer.content).sections,
    isViewable: !!answer.viewerHasAccess,
    creationTime: answer.creationTime,
    updatedTime: answer.updatedTime,
    numComments: answer.numDisplayComments,
    numUpvotes: answer.numUpvotes,
    numViews: answer.numViews,
    numShares: answer.numShares,
    numAnswerRequests: answer.numRequesters,
    aid: answer.aid,
    isBusinessAnswer: answer.businessAnswer,
    author: {
      uid: answer.author.uid,
      isAnon: answer.author.isAnon,
      image: answer.author.profileImageUrl,
      isVerified: answer.author.isVerified,
      url: quetrefy(answer.author.profileUrl),
      name: `${answer.author.names[0].givenName} ${answer.author.names[0].familyName}`,
      credential: answer.authorCredential?.translatedString,
      // additionalCredentials: answer.node.answer?.credibilityFacts.map(),
    },
    originalQuestion: {
      text: JSON.parse(answer.question.title).sections,
      url: quetrefy(answer.question.url),
      qid: answer.question.qid,
      isDeleted: answer.question.isDeleted,
    },
  }));

  // main data object to be returned
  const data = {
    question: {
      text: JSON.parse(rawData.question.title).sections,
      url: quetrefy(rawData.question.url),
      qid: rawData.question.qid,
      idDeleted: rawData.question.isDeleted,
      isViewable: rawData.question.isVisibleToViewer,
      askerUid: rawData.question.asker.uid,
    },
    numAnswers: rawData.answerCount,
    answers: ansArr,
    topics: rawData.question.topics.map(topicObj => ({
      tid: topicObj.tid,
      name: topicObj.name,
      url: quetrefy(topicObj.url),
    })),
    relatedQuestions: rawData.related.map(questionObj => ({
      qid: questionObj.qid,
      url: quetrefy(questionObj.url),
      text: JSON.parse(questionObj.title).sections,
    })),
  };

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getAnswers;
