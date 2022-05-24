////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
// import log from '../utils/log.js';
import AppError from '../utils/AppError.js';
import fetcher from './fetcher.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const getAnswers = async slug => {
  // getting data and destructuring it in case it exists
  const res = await fetcher(slug);
  if (!Object.entries(res).length) throw new Error('no data received!');

  const {
    data: { question: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError(
      "Couldn't find such an answer. Maybe check the URL?",
      400
    );

  // array containing all the answers with metadata
  const ansArr = rawData.pagedListDataConnection.edges
    .filter(ansObj => ansObj.node.answer !== undefined)
    .map(ansObj => ({
      text: JSON.parse(ansObj.node.answer.content).sections,
      isViewable: !!ansObj.node.answer.viewerHasAccess,
      creationTime: ansObj.node.answer.creationTime,
      updatedTime: ansObj.node.answer.updatedTime,
      numComments: ansObj.node.answer.numDisplayComments,
      numUpvotes: ansObj.node.answer.numUpvotes,
      numViews: ansObj.node.answer.numViews,
      numShares: ansObj.node.answer.numSharers,
      numAnswerRequests: ansObj.node.answer.numRequesters,
      aid: ansObj.node.answer.aid,
      isBusinessAnswer: ansObj.node.answer.businessAnswer,
      author: {
        uid: ansObj.node.answer.author.uid,
        isAnon: ansObj.node.answer.author.isAnon,
        avatar: ansObj.node.answer.author.profileImageUrl,
        isVerified: ansObj.node.answer.author.isVerified,
        profile: ansObj.node.answer.author.profileUrl,
        name: `${ansObj.node.answer.author.names[0].givenName} ${ansObj.node.answer.author.names[0].familyName}`,
        credential: ansObj.node.answer.authorCredential?.translatedString,
        // additionalCredentials: ansObj.node.answer?.credibilityFacts.map(),
      },
      OriginalQuestion: {
        text: JSON.parse(ansObj.node.answer.question.title).sections[0],
        url: ansObj.node.answer.question.url,
        qid: ansObj.node.answer.question.qid,
        isDeleted: ansObj.node.answer.question.isDeleted,
      },
    }));

  // main data object to be returned
  const data = {
    question: {
      text: JSON.parse(rawData.title).sections[0],
      url: rawData.url,
      qid: rawData.qid,
      idDeleted: rawData.isDeleted,
      isViewable: rawData.isVisibleToViewer,
      askerUid: rawData.asker.uid,
    },
    numAnswers: rawData.answerCount,
    answers: ansArr,
    topics: rawData.topics.map(topicObj => ({
      tid: topicObj.tid,
      name: topicObj.name,
      url: topicObj.url,
    })),
    relatedQuestions: rawData.bottomRelatedQuestionsInfo.relatedQuestions.map(
      questionObj => ({
        qid: questionObj.qid,
        url: questionObj.url,
        text: JSON.parse(questionObj.title).sections[0],
      })
    ),
  };

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getAnswers;
