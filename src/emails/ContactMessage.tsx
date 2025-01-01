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
                                key="Logo"
                                src="https://utfs.io/f/ec4a6c83-e1e5-4be9-a579-867f895cabcf-1n7yu8.jpg"
                                width="50"
                                height="50"
                                alt="3841 Biscayne Beach"
                                className="inline-block rounded-full shadow-lg"
                            />{" "}
                            <Text
                                key="Self Ref"
                                className="ml-1 inline-block h-full align-top text-xl font-semibold text-blue-500"
                            >
                                3841 Biscayne Beach
                            </Text>
                        </Section>
                        <Section>
                            <Row>
                                <Text
                                    key="Intro"
                                    className="text-3xl font-bold"
                                >
                                    {`Here's what ${name} wrote`}
                                </Text>
                            </Row>
                            <Row className="ml-2 rounded-lg bg-slate-100 px-5">
                                {message.split("\n").map((line, key) => (
                                    <Text
                                        key={`Message Line #${key + 1}`}
                                        className="text-lg"
                                    >
                                        {line}
                                    </Text>
                                ))}
                            </Row>
                            <Row>
                                <Text key="Outro">
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
