const Readline = require('linebyline');
const avro = require('avro-js');


/**
 * Encode an avro block using BlockEncoder
 * @param {string} value
 * @returns {Promise<object>}
 */
function decodeBlock(value) {
  return new Promise(resolve => {
    let payloadChunk;
    const payloadDecoder = new avro.streams.BlockDecoder();
    payloadDecoder.on('data', (chunk) => payloadChunk = chunk);
    payloadDecoder.on('end', () => {
      resolve(payloadChunk);
    });

    payloadDecoder.write(value);
    payloadDecoder.end();
  });
}

const rl = new Readline(process.stdin, {
  retainBuffer: true,
});

rl.on('line', function (line) {
  decodeBlock(line)
    .then(jsonObj => {
      console.log(JSON.stringify(jsonObj, null, 2));
    })
    .catch(() => {
      // just echo the line if we couldn't decode
      console.log(line.toString('utf8'));
    });
});
