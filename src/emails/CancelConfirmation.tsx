import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

interface CancelConfirmationEmailProps {
    name: string;
    email: string;
    startDate: Date;
    endDate: Date;
}

export const CancelConfirmationEmail = ({
    name,
    email,
    startDate,
    endDate,
}: CancelConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>3841 Biscayne Beach</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white font-sans">
                    <Container className="mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-slate-300 p-5">
                        <Section className="mt-3">
                            <Img
                                src="https://utfs.io/f/ec4a6c83-e1e5-4be9-a579-867f895cabcf-1n7yu8.jpg"
                                width="400"
                                height="280"
                                alt="3841 Biscayne Beach"
                                className="mx-auto rounded-lg shadow-lg"
                            />
                        </Section>
                        <Heading className="my-3 text-center text-2xl font-normal text-black">
                            Cancelled booking for{" "}
                            {startDate.toLocaleDateString()} to{" "}
                            {endDate.toLocaleDateString()}
                        </Heading>
                        <Section>
                            <Text className="text-xl text-black">
                                Hello {name},
                            </Text>
                            <Container className="-mt-5 ml-2">
                                <Text className="text-lg text-black">
                                    You have successfully cancelled your
                                    booking.
                                </Text>

                                <Text className="text-lg text-black">
                                    If a refund is applicable, you will receive
                                    a receipt from Stripe notifying you of the
                                    refund amount.
                                </Text>
                                <Text className="text-lg text-black">
                                    {
                                        "For questions regarding the refund process, please reach out to Stripe's customer support."
                                    }
                                </Text>
                                <Text className="text-lg text-black">
                                    For questions regarding your cancellation,
                                    please refer to our{" "}
                                    <Link
                                        // href={`${env.NEXTAUTH_URL}/house-rules`}
                                        href={
                                            "https://www.3841biscaynebeach.com/house-rules"
                                        }
                                        className="text-blue-600 no-underline"
                                    >
                                        Cancellation Policy.
                                    </Link>
                                </Text>
                            </Container>
                        </Section>
                        <Text className="text-center text-lg text-black">
                            We hope you choose to book with us in the future 😊
                        </Text>
                        <Hr className="my-6 w-full border border-solid border-slate-300" />
                        <Text className="text text-xs text-slate-500">
                            This cancellation notice was intended for {email}.
                            If that is not you, or if you believe this
                            cancellation to be a mistake, please reply to this
                            email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default CancelConfirmationEmail;
