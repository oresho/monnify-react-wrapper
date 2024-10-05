"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** 
 * Configuration options for initializing a payment with Monnify.
 * 
 * @param {Object} config - Payment configuration object.
 * @param {number} config.amount - Amount to be paid (in the smallest currency unit, e.g., kobo for NGN).
 * @param {string} config.currency - Currency code (e.g., 'NGN' for Nigerian Naira).
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
var Monnify = /*#__PURE__*/function () {
  function Monnify(apiKey, contractCode) {
    _classCallCheck(this, Monnify);
    this.apiKey = apiKey;
    this.contractCode = contractCode;
    this.VALID_PAYMENT_METHODS = ["CARD", "ACCOUNT_TRANSFER", "USSD", "PHONE_NUMBER"];

    // Load the SDK script asynchronously
    this.loadSDK();
  }

  // Asynchronously loads the Monnify SDK
  return _createClass(Monnify, [{
    key: "loadSDK",
    value: function loadSDK() {
      return new Promise(function (resolve, reject) {
        if (window.MonnifySDK) {
          resolve();
        } else {
          var script = document.createElement('script');
          script.src = 'https://sdk.monnify.com/plugin/monnify.js';
          script.async = true;
          script.onload = function () {
            if (window.MonnifySDK) {
              resolve();
            } else {
              reject(new Error('Failed to load Monnify SDK'));
            }
          };
          script.onerror = function () {
            return reject(new Error('Failed to load Monnify SDK script'));
          };
          document.body.appendChild(script);
        }
      });
    }

    // Validates the provided payment configuration
  }, {
    key: "validateConfig",
    value: function validateConfig(config) {
      var _this = this;
      var requiredFields = ['amount', 'currency', 'reference', 'customerFullName', 'customerEmail', 'paymentDescription'];
      var isValid = true;
      requiredFields.forEach(function (field) {
        if (!config[field]) {
          console.error("Missing required field: ".concat(field));
          isValid = false;
        }
      });
      if (config.paymentMethods && Array.isArray(config.paymentMethods) && config.paymentMethods.length === 0) {
        console.error('Error: No payment methods specified.');
        isValid = false;
      }
      if (config.paymentMethods) {
        var invalidMethods = config.paymentMethods.filter(function (method) {
          return !_this.VALID_PAYMENT_METHODS.includes(method);
        });
        if (invalidMethods.length > 0) {
          console.error("Invalid payment methods: ".concat(invalidMethods.join(', ')));
          isValid = false;
        }
      }
      return isValid;
    }

    // Initializes the payment process
  }, {
    key: "initializePayment",
    value: function initializePayment(config) {
      var _this2 = this;
      if (!this.validateConfig(config)) {
        console.error('Payment initialization aborted due to invalid config.');
        return;
      }
      this.loadSDK().then(function () {
        var paymentConfig = _objectSpread(_objectSpread({}, config), {}, {
          apiKey: _this2.apiKey,
          contractCode: _this2.contractCode,
          onLoadStart: function onLoadStart() {
            return console.log('Monnify SDK loading started');
          },
          onLoadComplete: function onLoadComplete() {
            return console.log('Monnify SDK is ready');
          },
          onComplete: config.onComplete || function (response) {
            return console.log('Transaction complete:', response);
          },
          onClose: config.onClose || function (response) {
            return console.log('Transaction modal closed:', response);
          }
        });
        if (window.MonnifySDK) {
          window.MonnifySDK.initialize(paymentConfig);
        } else {
          throw new Error('Monnify SDK not available');
        }
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }]);
}();
var _default = exports["default"] = Monnify;