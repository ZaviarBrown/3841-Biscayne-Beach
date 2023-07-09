import { APIContracts, APIControllers } from "authorizenet";

import { env } from "~/env.mjs";

export default function chargeCreditCard() {
    const merchantAuthenticationType =
        new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(env.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(env.TRANSACTION_KEY);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber("4242424242424242");
    creditCard.setExpirationDate("0823");
    creditCard.setCardCode("999");

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const orderDetails = new APIContracts.OrderType();
    orderDetails.setInvoiceNumber("INV-12345");
    orderDetails.setDescription("Product Description");

    const tax = new APIContracts.ExtendedAmountType();
    tax.setAmount("4.26");
    tax.setName("level2 tax name");
    tax.setDescription("level2 tax");

    const duty = new APIContracts.ExtendedAmountType();
    duty.setAmount("8.55");
    duty.setName("duty name");
    duty.setDescription("duty description");

    const shipping = new APIContracts.ExtendedAmountType();
    shipping.setAmount("8.55");
    shipping.setName("shipping name");
    shipping.setDescription("shipping description");

    const billTo = new APIContracts.CustomerAddressType();
    billTo.setFirstName("Ellen");
    billTo.setLastName("Johnson");
    billTo.setCompany("Souveniropolis");
    billTo.setAddress("14 Main Street");
    billTo.setCity("Pecan Springs");
    billTo.setState("TX");
    billTo.setZip("44628");
    billTo.setCountry("USA");

    const shipTo = new APIContracts.CustomerAddressType();
    shipTo.setFirstName("China");
    shipTo.setLastName("Bayles");
    shipTo.setCompany("Thyme for Tea");
    shipTo.setAddress("12 Main Street");
    shipTo.setCity("Pecan Springs");
    shipTo.setState("TX");
    shipTo.setZip("44628");
    shipTo.setCountry("USA");

    const lineItem_id1 = new APIContracts.LineItemType();
    lineItem_id1.setItemId("1");
    lineItem_id1.setName("vase");
    lineItem_id1.setDescription("cannes logo");
    lineItem_id1.setQuantity("18");
    lineItem_id1.setUnitPrice(45.0);

    const lineItem_id2 = new APIContracts.LineItemType();
    lineItem_id2.setItemId("2");
    lineItem_id2.setName("vase2");
    lineItem_id2.setDescription("cannes logo2");
    lineItem_id2.setQuantity("28");
    lineItem_id2.setUnitPrice("25.00");

    const lineItemList = [];
    lineItemList.push(lineItem_id1);
    lineItemList.push(lineItem_id2);

    const lineItems = new APIContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    const userField_a = new APIContracts.UserField();
    userField_a.setName("A");
    userField_a.setValue("Aval");

    const userField_b = new APIContracts.UserField();
    userField_b.setName("B");
    userField_b.setValue("Bval");

    const userFieldList = [];
    userFieldList.push(userField_a);
    userFieldList.push(userField_b);

    const userFields = new APIContracts.TransactionRequestType.UserFields();
    userFields.setUserField(userFieldList);

    const transactionSetting1 = new APIContracts.SettingType();
    transactionSetting1.setSettingName("duplicateWindow");
    transactionSetting1.setSettingValue("120");

    const transactionSetting2 = new APIContracts.SettingType();
    transactionSetting2.setSettingName("recurringBilling");
    transactionSetting2.setSettingValue("false");

    const transactionSettingList = [];
    transactionSettingList.push(transactionSetting1);
    transactionSettingList.push(transactionSetting2);

    const transactionSettings = new APIContracts.ArrayOfSetting();
    transactionSettings.setSetting(transactionSettingList);

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
        APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(58.0);
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setUserFields(userFields);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setDuty(duty);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);
    transactionRequestType.setTransactionSettings(transactionSettings);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    const ctrl = new APIControllers.CreateTransactionController(
        createRequest.getJSON()
    );
    //Defaults to sandbox
    //ctrl.setEnvironment(SDKConstants.endpoint.production);

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

if (require.main === module) {
    chargeCreditCard(function () {
        console.log("chargeCreditCard call complete.");
    });
}
