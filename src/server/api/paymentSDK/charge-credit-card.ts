import { APIContracts, APIControllers } from "authorizenet";
import { env } from "~/env.mjs";

interface BookingInfo {
    cardNumber: string;
    expDate: string;
    cardCode: string;
    transactionId: string;
    dates: string;
}

export default function chargeCreditCard(info: BookingInfo) {
    const { cardNumber, expDate, cardCode, transactionId, dates } = info;

    const merchantAuthenticationType =
        new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(env.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(env.TRANSACTION_KEY);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber || "4242424242424242"); // cardNumber
    creditCard.setExpirationDate(expDate || "0823"); // expDate

    creditCard.setCardCode(cardCode || "999"); // cardCode
    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const orderDetails = new APIContracts.OrderType();
    orderDetails.setInvoiceNumber(transactionId || "INV-12345672"); // bookingId or transactionId
    orderDetails.setDescription(dates || "Successfully Created"); // dates or address

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
        APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(58.0);
    transactionRequestType.setOrder(orderDetails);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    const ctrl = new APIControllers.CreateTransactionController(
        createRequest.getJSON()
    );

    ctrl.execute(function () {
        const apiResponse = ctrl.getResponse();

        const response = new APIContracts.CreateTransactionResponse(
            apiResponse
        );

        //pretty print response
        console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (
                response.getMessages().getResultCode() ==
                APIContracts.MessageTypeEnum.OK
            ) {
                if (response.getTransactionResponse().getMessages() != null) {
                    console.log(
                        "Successfully created transaction with Transaction ID: " +
                            response.getTransactionResponse().getTransId()
                    );
                    console.log(
                        "Response Code: " +
                            response.getTransactionResponse().getResponseCode()
                    );
                    console.log(
                        "Message Code: " +
                            response
                                .getTransactionResponse()
                                .getMessages()
                                .getMessage()[0]
                                .getCode()
                    );
                    console.log(
                        "Description: " +
                            response
                                .getTransactionResponse()
                                .getMessages()
                                .getMessage()[0]
                                .getDescription()
                    );
                } else {
                    console.log("Failed Transaction.");
                    if (response.getTransactionResponse().getErrors() != null) {
                        console.log(
                            "Error Code: " +
                                response
                                    .getTransactionResponse()
                                    .getErrors()
                                    .getError()[0]
                                    .getErrorCode()
                        );
                        console.log(
                            "Error message: " +
                                response
                                    .getTransactionResponse()
                                    .getErrors()
                                    .getError()[0]
                                    .getErrorText()
                        );
                    }
                }
            } else {
                console.log("Failed Transaction. ");
                if (
                    response.getTransactionResponse() != null &&
                    response.getTransactionResponse().getErrors() != null
                ) {
                    console.log(
                        "Error Code: " +
                            response
                                .getTransactionResponse()
                                .getErrors()
                                .getError()[0]
                                .getErrorCode()
                    );
                    console.log(
                        "Error message: " +
                            response
                                .getTransactionResponse()
                                .getErrors()
                                .getError()[0]
                                .getErrorText()
                    );
                } else {
                    console.log(
                        "Error Code: " +
                            response.getMessages().getMessage()[0].getCode()
                    );
                    console.log(
                        "Error message: " +
                            response.getMessages().getMessage()[0].getText()
                    );
                }
            }
        } else {
            console.log("Null Response.");
        }

        console.log("Wtf I guess that worked");
    });
}

//? --------------------------------------------------------------------
//? --------------------------------- Billing Address ---------------------------------
//? --------------------------------------------------------------------

// const billTo = new APIContracts.CustomerAddressType();
// billTo.setFirstName("Ellen");
// billTo.setLastName("Johnson");
// billTo.setCompany("Souveniropolis");
// billTo.setAddress("14 Main Street");
// billTo.setCity("Pecan Springs");
// billTo.setState("TX");
// billTo.setZip("44628");
// billTo.setCountry("USA");
// ---
// transactionRequestType.setBillTo(billTo);
