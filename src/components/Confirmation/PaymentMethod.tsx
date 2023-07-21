import { useRef, useState } from "react";

const PaymentMethod = () => {
    const [cardName, setCardName] = useState("");
    const [firstCCNums, setFirstCCNums] = useState("");
    const [secondCCNums, setSecondCCNums] = useState("");
    const [thirdCCNums, setThirdCCNums] = useState("");
    const [fourthCCNums, setFourthCCNums] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [code, setCode] = useState("");

    const firstCCRef = useRef<HTMLInputElement>(null);
    const secondCCRef = useRef<HTMLInputElement>(null);
    const thirdCCRef = useRef<HTMLInputElement>(null);
    const fourthCCRef = useRef<HTMLInputElement>(null);
    const expMonthRef = useRef<HTMLInputElement>(null);
    const expYearRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        limit: number,
        setState: React.Dispatch<React.SetStateAction<string>>,
        nextInputRef: React.RefObject<HTMLInputElement>
    ) => {
        const inputValue = e.target.value;

        if (inputValue.length <= limit) {
            setState(inputValue);
        }
        if (inputValue.length >= limit && nextInputRef.current) {
            nextInputRef.current.focus();
        }
    };

    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>
            <form>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                        Name On Card
                    </label>
                    <input
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="John Doe"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="cardNumber"
                        className="mb-2 block text-sm font-bold text-gray-700"
                    >
                        Card Number
                    </label>
                    <div className="flex gap-2">
                        <input
                            name="cardNumber"
                            ref={firstCCRef}
                            value={firstCCNums}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    4,
                                    setFirstCCNums,
                                    secondCCRef
                                )
                            }
                            placeholder="XXXX"
                            className=" w-16 rounded-l border px-3 py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                        />
                        <input
                            ref={secondCCRef}
                            value={secondCCNums}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    4,
                                    setSecondCCNums,
                                    thirdCCRef
                                )
                            }
                            placeholder="XXXX"
                            className=" w-16 border px-3 py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                        />
                        <input
                            ref={thirdCCRef}
                            value={thirdCCNums}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    4,
                                    setThirdCCNums,
                                    fourthCCRef
                                )
                            }
                            placeholder="XXXX"
                            className="w-16 border px-3 py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                        />
                        <input
                            ref={fourthCCRef}
                            value={fourthCCNums}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    4,
                                    setFourthCCNums,
                                    expMonthRef
                                )
                            }
                            placeholder="XXXX"
                            className="w-16 rounded-r border px-3 py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-x-5">
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            Expiration Date
                        </label>
                        <input
                            ref={expMonthRef}
                            value={expMonth}
                            onChange={(e) =>
                                handleInputChange(e, 2, setExpMonth, expYearRef)
                            }
                            className="focus:shadow-outline w-11 appearance-none rounded border py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                            type="text"
                            placeholder="MM"
                        />
                        <span className="mx-1 text-xl">/</span>
                        <input
                            ref={expYearRef}
                            value={expYear}
                            onChange={(e) =>
                                handleInputChange(e, 2, setExpYear, codeRef)
                            }
                            className="focus:shadow-outline w-11 appearance-none rounded border py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                            type="text"
                            placeholder="YY"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">
                            CVV
                        </label>
                        <input
                            ref={codeRef}
                            value={code}
                            onChange={(e) =>
                                handleInputChange(e, 4, setCode, codeRef)
                            }
                            className="focus:shadow-outline w-14 appearance-none rounded border py-2 text-center text-sm text-gray-700 shadow focus:outline-none"
                            type="text"
                            placeholder="XXX"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;
