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
} from '@react-email/components';

interface BookingConfirmationEmailProps {
    name: string;
    email: string;
    startDate: Date;
    endDate: Date;
}

export const BookingConfirmationEmail = ({
    name,
    email,
    startDate,
    endDate,
}: BookingConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>3841 Biscayne Beach</Preview>
            <Tailwind>
                <Body className='mx-auto my-auto bg-white font-sans'>
                    <Container className='mx-auto my-10 max-w-[600px] rounded-lg border border-solid border-slate-300 p-5'>
                        <Section className='mt-3'>
                            <Img
                                src='https://utfs.io/f/ec4a6c83-e1e5-4be9-a579-867f895cabcf-1n7yu8.jpg'
                                width='400'
                                height='280'
                                alt='3841 Biscayne Beach'
                                className='mx-auto rounded-lg shadow-lg'
                            />
                        </Section>
                        <Heading className='my-3 text-center text-2xl font-normal text-black'>
                            Booking confirmed from{' '}
                            {startDate.toLocaleDateString()} to{' '}
                            {endDate.toLocaleDateString()}
                        </Heading>
                        <Section>
                            <Text className='text-xl text-black'>
                                Hello {name},
                            </Text>
                            <Container className='-mt-5 ml-2'>
                                <Text className='text-lg text-black'>
                                    Thank you for booking with us!
                                </Text>

                                <Text className='text-lg text-black'>
                                    Check-in starts at 3pm on{' '}
                                    {startDate.toLocaleDateString()}.
                                </Text>
                                <Text className='text-lg text-black'>
                                    You must check-out by 11am on{' '}
                                    {endDate.toLocaleDateString()}.
                                </Text>
                                <Text className='text-lg text-black'>
                                    You can view the House Rules and check-out
                                    procedure{' '}
                                    <Link
                                        // href={`${env.NEXTAUTH_URL}/house-rules`}
                                        href={
                                            'https://www.cheersbeaches.house/house-rules'
                                        }
                                        className='text-blue-600 no-underline'
                                    >
                                        here.
                                    </Link>
                                </Text>
                            </Container>
                        </Section>
                        <Text className='text-center text-lg text-black'>
                            We look forward to seeing you on the beach 😊
                        </Text>
                        <Hr className='my-6 w-full border border-solid border-slate-300' />
                        <Text className='text text-xs text-slate-500'>
                            This confirmation was intended for {email}. If that
                            is not you, or you believe this booking to be a
                            mistake, please reply to this email to get in touch
                            with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default BookingConfirmationEmail;
