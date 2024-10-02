/**
 * Configuration options for initializing a payment with Monnify.
 */
interface PaymentConfig {
    /** Amount to be paid (in the smallest currency unit, e.g., kobo for NGN). */
    amount: number;
    /** Currency code (e.g., 'NGN' for Nigerian Naira). */
    currency: string;
    /** Unique reference for the payment transaction. */
    reference: string;
    /** Full name of the customer making the payment. */
    customerFullName: string;
    /** Email address of the customer. */
    customerEmail: string;
    /** Description of the payment. */
    paymentDescription: string;
    /** Optional redirect URL after payment completion. */
    redirectUrl?: string;
    /** Optional array of payment methods to display. */
    paymentMethods?: Array<string>;
    /** Optional metadata for additional information. */
    metadata?: Record<string, any>;
    /** Optional configuration for splitting payments between sub-accounts. */
    incomeSplitConfig?: Array<{
        /** Sub-account code for income splitting. */
        subAccountCode: string;
        /** Optional fee percentage for the sub-account. */
        feePercentage?: number;
        /** Optional amount to split for the sub-account. */
        splitAmount?: number;
        /** Indicates who bears the fee (true for the customer, false for the merchant). */
        feeBearer: boolean;
    }>;
    /** Callback function executed on successful completion of the transaction. */
    onComplete?: (response: MonnifyResponse) => void;
    /** Callback function executed when the payment modal is closed. */
    onClose?: (response: UserCancelledResponse) => void;
}
/**
 * Response object returned by Monnify upon successful payment completion.
 */
interface MonnifyResponse {
    /** Amount that was to be paid. */
    amount: number;
    /** Amount that was actually paid. */
    amountPaid: number;
    /** Indicates if the transaction was completed successfully. */
    completed: boolean;
    /** Timestamp of when the transaction was completed. */
    completedOn: string;
    /** Timestamp of when the transaction was created. */
    createdOn: string;
    /** Currency code of the payment (e.g., 'NGN'). */
    currencyCode: string;
    /** Email address of the customer who made the payment. */
    customerEmail: string;
    /** Full name of the customer who made the payment. */
    customerName: string;
    /** Fees charged for the transaction. */
    fee: number;
    /** Metadata related to the transaction, such as device type and IP address. */
    metaData: {
        /** Type of device used for the transaction (e.g., 'mobile'). */
        deviceType: string;
        /** IP address from which the transaction was initiated. */
        ipAddress: string;
    };
    /** Total amount due for payment. */
    payableAmount: number;
    /** Method used for payment (e.g., 'CARD'). */
    paymentMethod: string;
    /** Unique reference for the payment transaction. */
    paymentReference: string;
    /** Current status of the payment (e.g., 'PAID'). */
    paymentStatus: string;
    /** Unique transaction reference. */
    transactionReference: string;
}
/**
 * Response object returned by Monnify if a user cancels the transaction.
 */
interface UserCancelledResponse {
    /** Amount authorized before cancellation. */
    authorizedAmount: number;
    /** Status of the payment at the time of cancellation. */
    paymentStatus: string;
    /** Optional redirect URL that may be provided. */
    redirectUrl: string | null;
    /** Code representing the response status (e.g., 'USER_CANCELLED'). */
    responseCode: string;
    /** Message describing the cancellation event. */
    responseMessage: string;
}
declare global {
    interface Window {
        /** Global reference to the Monnify SDK. */
        MonnifySDK: any;
    }
}
/**
 * Monnify class for handling payment initialization with the Monnify SDK.
 */
declare class Monnify {
    private apiKey;
    private contractCode;
    private static readonly VALID_PAYMENT_METHODS;
    /**
     * Creates an instance of the Monnify class.
     * @param apiKey - The API key provided by Monnify.
     * @param contractCode - The contract code provided by Monnify.
     */
    constructor(apiKey: string, contractCode: string);
    /**
     * Asynchronously loads the Monnify SDK.
     * @returns A promise that resolves when the SDK is loaded successfully.
     */
    private loadSDK;
    /**
     * Validates the provided payment configuration.
     * Logs errors for any missing required fields or invalid payment methods.
     * @param config - The configuration object for payment initialization.
     * @returns True if the configuration is valid; otherwise, false.
     */
    private validateConfig;
    /**
     * Asynchronously initializes the payment process with Monnify.
     * @param config - The configuration object for payment initialization.
     * @returns A promise that resolves when the payment is successfully initialized.
     */
    initializePayment(config: PaymentConfig): Promise<void>;
}
export default Monnify;
