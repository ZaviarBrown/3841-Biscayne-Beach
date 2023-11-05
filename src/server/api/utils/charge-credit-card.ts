// TODO: New repo, auth.net TS API

import { APIContracts, APIControllers } from "authorizenet";
import { env } from "~/env.mjs";

interface CardInfo {
    cardNum: string;
    expDate: string;
    cardCode: string;
    invoiceId: string;
    dates: string;
    totalPrice: number;
    email: string;
}

interface ApiControllerResponseType {
    transactionResponse: {
        responseCode: string;
        transId: string;
        errors: { errorCode: string; errorText: string }[];
    };
    messages: {
        resultCode: "Ok" | "Error";
        message: { code: string; text: string }[];
    };
}

type CreditCardReturnType =
    | {
          wasSuccessful: true;
          invoiceId: string;
          transactionId: string;
      }
    | {
          wasSuccessful: false;
          errors: { errorCode: string; errorText: string }[];
      };

export default async function chargeCreditCard(
    info: CardInfo
): Promise<CreditCardReturnType> {
    const { cardNum, expDate, cardCode, invoiceId, dates, totalPrice, email } =
        info;

    //! --------------------------------------------------------------------
    //*                       Authorize.net Credentials
    //! --------------------------------------------------------------------

    const merchantAuthenticationType =
        new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(env.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(env.TRANSACTION_KEY);

    //! --------------------------------------------------------------------
    //*                           Credit Card Info
    //! --------------------------------------------------------------------

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNum); // || "4242424242424242");
    creditCard.setExpirationDate(expDate); // || "0823");
    creditCard.setCardCode(cardCode); // || "999");

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    //! --------------------------------------------------------------------
    //*                            Order Details
    //! --------------------------------------------------------------------

    const orderDetails = new APIContracts.OrderType();
    orderDetails.setInvoiceNumber(invoiceId); // || "INV-12345672");
    orderDetails.setDescription(dates); // || "Successfully Created");

    //! --------------------------------------------------------------------
    //*                            Customer Data
    //! --------------------------------------------------------------------

    const customerData = new APIContracts.CustomerDataType();
    customerData.setEmail(email);

    //! --------------------------------------------------------------------
    //*                          Create Transaction
    //! --------------------------------------------------------------------

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
        APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalPrice);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setCustomer(customerData);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(
        createRequest.getJSON()
    );

    return await new Promise((resolve) => {
        ctrl.execute(() => {
            const apiResponse = ctrl.getResponse() as ApiControllerResponseType;

            if (apiResponse.messages.resultCode === "Ok") {
                resolve({
                    wasSuccessful: true,
                    invoiceId,
                    transactionId: apiResponse.transactionResponse.transId,
                });
            } else {
                resolve({
                    wasSuccessful: false,
                    errors: apiResponse.transactionResponse.errors,
                });
            }

            // pretty print request
            console.log(
                "\n\n-----------\n  Request\n-----------\n",
                JSON.stringify(createRequest.getJSON(), null, 2)
            );

            // pretty print response
            console.log(
                "\n\n------------\n  Response\n------------\n",
                JSON.stringify(
                    new APIContracts.CreateTransactionResponse(apiResponse),
                    null,
                    2
                )
            );
        });
    });
}
