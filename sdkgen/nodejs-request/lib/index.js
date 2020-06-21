// TODO add options and fetch options
const getCodegenOptions = require('postman-code-generators').getOptions,
  processCollection = require('./util').processCollection;

/**
 * Generates sdk for nodejs-request

 * @param {PostmanCollection} collection - Postman collection Instance
 * @param {Object} options - postman-code-generators options
 * @param {Function} callback - callback functio to return results (err, response)
 * @returns {String} - sdk snippet for input collection
 * TODO add indentation to entire snippet
 */
function generate (collection, options, callback) {
  var snippet = '',
    // sdkname = collection.name.split(' ').join('_'),
    sdkname = 'SDKNAME',
    indent = options.indentType === 'Tab' ? '\t' : ' ';
  indent = indent.repeat(options.indentCount);
  processCollection(collection, options, (err, collectionSnippet) => {
    if (err) {
      return callback(err, null);
    }

    if (options.ES6_enabled) {
      snippet += 'const ';
    }
    else {
      snippet += 'var ';
    }
    snippet += 'request = require(\'request\');\n\n';
    snippet += `function ${sdkname}(environment = {}) {\n\n`;
    snippet += indent + 'const collectionVariables = {\n';
    collection.variables.each((item) => {
      snippet += indent.repeat(2) + `${item.key}: '${item.value}',\n`;
    });
    snippet += indent + '};\n\n';
    snippet += options.ES6_enabled ? 'const ' : 'var ';
    snippet += 'self = this;\n\n';
    snippet += indent + 'this.requests = {\n';
    snippet += collectionSnippet;
    snippet += indent + '};\n\n';
    snippet += indent + 'this.environmentVariables = collectionVariables;\n\n';
    snippet += indent + 'Object.keys(environment).forEach(function (key) {\n';
    snippet += indent.repeat(2) + 'self.environmentVariables[key] = environment[key];\n';
    snippet += indent + '});\n';
    snippet += '}\n\n';
    snippet += 'module.exports = SDKNAME;\n';
    return callback(null, snippet);
  });
}

/**
 * Gives a list of possible options for nodejs-request sdk generator
 * TODO update and test this function
 */
function getOptions () {
  var result;
  getCodegenOptions('NodeJs', 'Request', (err, codegenOptions) => {
    if (err) {
      result = err;
      return;
    }
    result = codegenOptions;
  });
  return result;
}

module.exports = {
  generate,
  getOptions
};