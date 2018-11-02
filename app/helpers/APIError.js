/** Class representing an API Error Response with a related HTTP Status Code **/
class APIError extends Error {
  
  /**
   * Create an Error Object
   * @param {Number} status - The HTTP Status Code (e.g. 404)
   * @param {String} message - Specific information about what caused the error
   */
    constructor(
        status = 500,
        message = 'An unknown server error occurred.'
    ) {
        super(message);
        this.status = status;
        this.message = message;
    }
    toJSON() {
        const {
            status,
            message
        } = this;
        return {
            error: message
        };
    }
}

module.exports = APIError;
