////////////////////////////////////////////////////////
//                     FUNCTION
////////////////////////////////////////////////////////

/**
 *
 * @param {string | object} toLog stuff to log
 * @param {'success'| 'error'} type optional type param to color the log accordingly
 * @description logs color coded stuff to the stdout so that it's easily distinguishable
 */
function log(toLog, type = null) {
  // setting defaults
  const data = {
    message: toLog?.message || toLog,
    stack: toLog?.stack || '',
    colorCode: 33,
    emoji: '🟡',
  };

  // changing some values according to the type provided
  if (type === 'success') {
    data.colorCode = 32;
    data.emoji = '🟢';
  } else if (type === 'error') {
    data.colorCode = 31;
    data.emoji = '🔴';
  }

  // actually logging to the console
  // eslint-disable-next-line no-console
  console.log(
    `\u001b[${data.colorCode}m ${data.emoji} ${data.message}\n${data.stack} \u001b[39m`
  );
}

////////////////////////////////////////////////////////
//                      EXPORTS
////////////////////////////////////////////////////////
export default log;
