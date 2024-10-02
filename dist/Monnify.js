var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Monnify class for handling payment initialization with the Monnify SDK.
 */
var Monnify = /** @class */ (function () {
    /**
     * Creates an instance of the Monnify class.
     * @param apiKey - The API key provided by Monnify.
     * @param contractCode - The contract code provided by Monnify.
     */
    function Monnify(apiKey, contractCode) {
        this.apiKey = apiKey;
        this.contractCode = contractCode;
        // Load the SDK script asynchronously
        this.loadSDK();
    }
    /**
     * Asynchronously loads the Monnify SDK.
     * @returns A promise that resolves when the SDK is loaded successfully.
     */
    Monnify.prototype.loadSDK = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (window.MonnifySDK) {
                            resolve();
                        }
                        else {
                            var script = document.createElement('script');
                            script.src = 'https://sdk.monnify.com/plugin/monnify.js';
                            script.async = true;
                            script.onload = function () {
                                if (window.MonnifySDK) {
                                    resolve();
                                }
                                else {
                                    reject(new Error('Failed to load Monnify SDK'));
                                }
                            };
                            script.onerror = function () { return reject(new Error('Failed to load Monnify SDK script')); };
                            document.body.appendChild(script);
                        }
                    })];
            });
        });
    };
    /**
     * Validates the provided payment configuration.
     * Logs errors for any missing required fields or invalid payment methods.
     * @param config - The configuration object for payment initialization.
     * @returns True if the configuration is valid; otherwise, false.
     */
    Monnify.prototype.validateConfig = function (config) {
        var requiredFields = ['amount', 'currency', 'reference', 'customerFullName', 'customerEmail', 'paymentDescription'];
        var isValid = true;
        requiredFields.forEach(function (field) {
            if (!config[field]) {
                console.error("Missing required field: ".concat(field));
                isValid = false;
            }
        });
        // Log an error if paymentMethods is defined but empty
        if (config.paymentMethods !== undefined && Array.isArray(config.paymentMethods) && config.paymentMethods.length === 0) {
            console.error('Error: No payment methods specified in paymentMethods array.');
            isValid = false;
        }
        // Validate the paymentMethods array
        if (config.paymentMethods) {
            var invalidMethods = config.paymentMethods.filter(function (method) { return !Monnify.VALID_PAYMENT_METHODS.includes(method); });
            if (invalidMethods.length > 0) {
                console.error("Error: Invalid payment methods specified: ".concat(invalidMethods.join(', ')));
                isValid = false;
            }
        }
        return isValid;
    };
    /**
     * Asynchronously initializes the payment process with Monnify.
     * @param config - The configuration object for payment initialization.
     * @returns A promise that resolves when the payment is successfully initialized.
     */
    Monnify.prototype.initializePayment = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, paymentConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isValid = this.validateConfig(config);
                        if (!isValid) {
                            console.error('Payment initialization aborted due to missing required fields or invalid payment methods.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadSDK()];
                    case 1:
                        _a.sent(); // Ensure SDK is loaded before initializing
                        paymentConfig = __assign(__assign({}, config), { apiKey: this.apiKey, contractCode: this.contractCode, onLoadStart: function () { return console.log('Monnify SDK loading started'); }, onLoadComplete: function () { return console.log('Monnify SDK is ready'); }, onComplete: function (response) {
                                if (config.onComplete) {
                                    config.onComplete(response);
                                }
                                else {
                                    console.log('Transaction complete:', response);
                                }
                            }, onClose: function (response) {
                                if (config.onClose) {
                                    config.onClose(response);
                                }
                                else {
                                    console.log('Transaction modal closed:', response);
                                }
                            } });
                        // Include paymentMethods in the configuration if defined
                        if (config.paymentMethods) {
                            paymentConfig.paymentMethods = config.paymentMethods;
                        }
                        if (window.MonnifySDK) {
                            window.MonnifySDK.initialize(paymentConfig);
                        }
                        else {
                            throw new Error('Monnify SDK not available');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Define the valid payment methods
    Monnify.VALID_PAYMENT_METHODS = [
        "CARD",
        "ACCOUNT_TRANSFER",
        "USSD",
        "PHONE_NUMBER"
    ];
    return Monnify;
}());
export default Monnify;
