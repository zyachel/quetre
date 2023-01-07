////////////////////////////////////////////////////////
//                     IMPORTS
////////////////////////////////////////////////////////
// import log from '../utils/log.js';
import AppError from '../utils/AppError.js';
import { quetrefy } from '../utils/urlModifiers.js';
import fetcher from './fetcher.js';

////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////
const KEYWORD = 'question';

const getAnswers = async (slug, lang) => {
  // getting data and destructuring it in case it exists
  const res = await fetcher(slug, { keyword: KEYWORD, lang });

  const {
    data: { [KEYWORD]: rawData },
  } = JSON.parse(res);

  if (!rawData)
    throw new AppError(
      "Answers couldn't be fetched. Recheck the URL, or resend the request if you believe the URL is correct.",
      404
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
        image: ansObj.node.answer.author.profileImageUrl,
        isVerified: ansObj.node.answer.author.isVerified,
        url: quetrefy(ansObj.node.answer.author.profileUrl),
        name: `${ansObj.node.answer.author.names[0].givenName} ${ansObj.node.answer.author.names[0].familyName}`,
        credential: ansObj.node.answer.authorCredential?.translatedString,
        // additionalCredentials: ansObj.node.answer?.credibilityFacts.map(),
      },
      originalQuestion: {
        text: JSON.parse(ansObj.node.answer.question.title).sections,
        url: quetrefy(ansObj.node.answer.question.url),
        qid: ansObj.node.answer.question.qid,
        isDeleted: ansObj.node.answer.question.isDeleted,
      },
    }));

  // main data object to be returned
  const data = {
    question: {
      text: JSON.parse(rawData.title).sections,
      url: quetrefy(rawData.url),
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
      url: quetrefy(topicObj.url),
    })),
    relatedQuestions: rawData.bottomRelatedQuestionsInfo.relatedQuestions.map(
      questionObj => ({
        qid: questionObj.qid,
        url: quetrefy(questionObj.url),
        text: JSON.parse(questionObj.title).sections,
      })
    ),
  };

  return data;
};

////////////////////////////////////////////////////////
//                     EXPORTS
////////////////////////////////////////////////////////
export default getAnswers;
