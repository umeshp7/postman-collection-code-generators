const codegen = require('postman-code-generators'),

/**
 * Replaces postman variables in request snippet with language specific declaration
 *
 * @param {String} requestSnippet - Request snipept generated by postman-code-generator
 * @returns {String} - Request snippet string with replaced collection variables
 */
function replaceVariables(requestSnippet) {
    var variableDeclarations = requestSnippet.match(/{{.*}}/g);
    if (variableDeclarations) {
        variableDeclarations.forEach((element) => {
            // replacing {{variable_name}} as required. Refer existing codegen for usage
        });
    }
    return requestSnippet;
}

/**
 * Generates snippet for a function declaration

 * @param {String} requestSnippet - Request snippet generated by postman-code-generator
 * @param {Object} options - postman-code-gen options (for specific language)
 * @returns {String} - returns a snippet of function declaration of of a request
 */
function generateFunctionSnippet(requestSnippet, options) {
    var snippet = '';
    // generate function snippet/declaration here
    return snippet;
}

/**
 * Extracts requests and generats snipepts collection members
 * Algorithm used : Reccursive dfs function with callbacks to handle 

 * @param {Object} collectionItemMember - PostmanItem or PostmanItemGroup instance
 * @param {Object} options - postman-code-gen options (for specific language)
 * @param {Functionn} callback - Function to return results (err, snippet)
 * @returns {Promise} - promise containing snippet for collection requests or error
 */
function processCollection(collectionItemMember, options, callback) {
    var snippet = '',
        error = null;
    if (sdk.Item.isItem(collectionItemMember)) {
        // if collectionItemMember is PostmanItem ie; is an PostmanRequest instance
        // Access Request instance here. Refer existing codegen for details
        return callback(error, snippet);
    }
    // If collectionItemMember is PostmaItemGroup
    // Refer existing codegen for more details
    collectionItemMember.items.members.forEach((element) => {
        processCollection(element, options, (err, snippet) => {
            if (err) {
                return callback(err, null);
            }
        });
    });
    return callback(error, snippet);
}

module.exports = {
    generateFunctionSnippet,
    processCollection
};