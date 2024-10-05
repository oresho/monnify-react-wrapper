/** 
 * Configuration options for initializing a payment with Monnify.
 * 
 * @param {Object} config - Payment configuration object.
 * @param {number} config.amount - Amount to be paid.
 * @param {string} config.currency - Currency code (e.g., 'NGN').
 * @param {string} config.reference - Unique reference for the payment transaction.
 * @param {string} config.customerFullName - Full name of the customer making the payment.
 * @param {string} config.customerEmail - Email address of the customer.
 * @param {string} config.paymentDescription - Description of the payment.
 * @param {string} [config.redirectUrl] - Optional redirect URL after payment completion.
 * @param {Array<string>} [config.paymentMethods] - Optional array of payment methods to display.
 * @param {Object} [config.metadata] - Optional metadata for additional information.
 * @param {Array<Object>} [config.incomeSplitConfig] - Optional configuration for splitting payments between sub-accounts.
 * @param {function} [config.onComplete] - Callback function executed on successful completion of the transaction.
 * @param {function} [config.onClose] - Callback function executed when the payment modal is closed.
 */

/**
 * Response returned by Monnify upon successful payment completion.
 * 
 * @param {Object} response - Monnify response object.
 * @param {number} response.amount - Amount to be paid.
 * @param {number} response.amountPaid - Amount actually paid.
 * @param {boolean} response.completed - Indicates if the transaction was completed successfully.
 * @param {string} response.completedOn - Timestamp when the transaction was completed.
 * @param {string} response.createdOn - Timestamp when the transaction was created.
 * @param {string} response.currencyCode - Currency code of the payment (e.g., 'NGN').
 * @param {string} response.customerEmail - Email address of the customer.
 * @param {string} response.customerName - Full name of the customer.
 * @param {number} response.fee - Fees charged for the transaction.
 * @param {Object} response.metaData - Metadata related to the transaction (device type, IP address, etc.).
 * @param {number} response.payableAmount - Total amount due for payment.
 * @param {string} response.paymentMethod - Payment method used (e.g., 'CARD').
 * @param {string} response.paymentReference - Unique reference for the payment transaction.
 * @param {string} response.paymentStatus - Status of the payment (e.g., 'PAID').
 * @param {string} response.transactionReference - Unique transaction reference.
 */

/**
 * Response returned by Monnify if a user cancels the transaction.
 * 
 * @param {Object} response - User cancelled response object.
 * @param {number} response.authorizedAmount - Amount authorized before cancellation.
 * @param {string} response.paymentStatus - Status of the payment at the time of cancellation.
 * @param {string} [response.redirectUrl] - Optional redirect URL.
 * @param {string} response.responseCode - Code representing the response status (e.g., 'USER_CANCELLED').
 * @param {string} response.responseMessage - Message describing the cancellation event.
 */

/**
 * Monnify class for handling payment initialization with the Monnify SDK.
 */
class Monnify {
    constructor(apiKey, contractCode) {
      this.apiKey = apiKey;
      this.contractCode = contractCode;
      this.VALID_PAYMENT_METHODS = [
        "CARD",
        "ACCOUNT_TRANSFER",
        "USSD",
        "PHONE_NUMBER"
      ];
  
      // Load the SDK script asynchronously
      this.loadSDK();
    }
  
    // Asynchronously loads the Monnify SDK
    loadSDK() {
      return new Promise((resolve, reject) => {
        if (window.MonnifySDK) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://sdk.monnify.com/plugin/monnify.js';
          script.async = true;
          script.onload = () => {
            if (window.MonnifySDK) {
              resolve();
            } else {
              reject(new Error('Failed to load Monnify SDK'));
            }
          };
          script.onerror = () => reject(new Error('Failed to load Monnify SDK script'));
          document.body.appendChild(script);
        }
      });
    }
  
    // Validates the provided payment configuration
    validateConfig(config) {
      const requiredFields = ['amount', 'currency', 'reference', 'customerFullName', 'customerEmail', 'paymentDescription'];
      let isValid = true;
  
      requiredFields.forEach((field) => {
        if (!config[field]) {
          console.error(`Missing required field: ${field}`);
          isValid = false;
        }
      });
  
      if (config.paymentMethods && Array.isArray(config.paymentMethods) && config.paymentMethods.length === 0) {
        console.error('Error: No payment methods specified.');
        isValid = false;
      }
  
      if (config.paymentMethods) {
        const invalidMethods = config.paymentMethods.filter(method => !this.VALID_PAYMENT_METHODS.includes(method));
        if (invalidMethods.length > 0) {
          console.error(`Invalid payment methods: ${invalidMethods.join(', ')}`);
          isValid = false;
        }
      }
  
      return isValid;
    }
  
    // Initializes the payment process
    initializePayment(config) {
      if (!this.validateConfig(config)) {
        console.error('Payment initialization aborted due to invalid config.');
        return;
      }
  
      this.loadSDK().then(() => {
        const paymentConfig = {
          ...config,
          apiKey: this.apiKey,
          contractCode: this.contractCode,
          onLoadStart: () => console.log('Monnify SDK loading started'),
          onLoadComplete: () => console.log('Monnify SDK is ready'),
          onComplete: config.onComplete || ((response) => console.log('Transaction complete:', response)),
          onClose: config.onClose || ((response) => console.log('Transaction modal closed:', response))
        };
  
        if (window.MonnifySDK) {
          window.MonnifySDK.initialize(paymentConfig);
        } else {
          throw new Error('Monnify SDK not available');
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  
  export default Monnify;
  