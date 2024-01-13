import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ContactMessageEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactMessageEmail = ({
    name,
    email,
    message,
}: ContactMessageEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>{email}</Preview>
            <Tailwind>
                <Body className="m-auto bg-white pt-10 font-sans">
                    <Container className="my-auto max-w-[600px]">
                        <Section>
                            <Img
                                src="https://utfs.io/f/ec4a6c83-e1e5-4be9-a579-867f895cabcf-1n7yu8.jpg"
                                width="50"
                                height="50"
                                alt="3841 Biscayne Beach"
                                className="inline-block rounded-full shadow-lg"
                            />{" "}
                            <Text className="ml-1 inline-block h-full align-top text-xl font-semibold text-blue-500">
                                3841 Biscayne Beach
                            </Text>
                        </Section>
                        <Section>
                            <Row>
                                <Text className="text-3xl font-bold">
                                    {`Here's what ${name} wrote`}
                                </Text>
                                <Text className="rounded-lg bg-slate-100 p-5 text-lg">
                                    {message}
                                </Text>
                                <Text>
                                    You can respond by replying to this email.
                                </Text>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactMessageEmail;
