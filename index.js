const {
  GoogleTranslator,
  supportedLanguages,
} = require("@translate-tools/core/translators/GoogleTranslator");

const translator = new GoogleTranslator({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
});

const limit = translator.getLengthLimit();

/**
 * Badly translate text.
 * @param {String} text Text to badly translate
 * @param {Number} iter Number of translation iterations
 * @param {String} lang Source and destination language. See supported()
 * 
 */
async function badlyTranslate(text, iter, lang) {
  var batch = [];
  batch = text.split("\n");
  for (var i = 0; i < batch.length; i++) {
    if (batch[i].length > limit) {
      throw new Error(
        `Character limit exceeded on text line ${
          i + 1
        }.\nPlease shorten this line to less than ${limit} characters.\n(Tip: break your text into multiple lines)`
      );
    }
  }

  var result = batch;
  var prevlang = lang;

  for (var i = 0; i < iter - 1; i++) {
    var toLang = supportedLanguages[Math.floor(Math.random() * supportedLanguages.length)];
    result = await translator.translateBatch(result, prevlang, toLang);
    prevlang = toLang;
  }

  result = await translator.translateBatch(result, prevlang, lang);
  var resString = result.join("\n");

  return resString;
}

function supported() {
  return supportedLanguages;
}

module.exports = badlyTranslate;
module.exports.supported = supported;
