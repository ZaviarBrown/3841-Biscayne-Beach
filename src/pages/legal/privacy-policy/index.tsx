import NavBarSpacer from "~/components/NavBarSpacer";

export default function PrivacyPolicy() {
    return (
        <>
            <NavBarSpacer />
            <div className="m-6 w-3/4 self-center rounded-lg bg-white p-5 text-black shadow-3xl">
                <div className="flex justify-center text-5xl font-bold">
                    Privacy Policy
                </div>

                <div className="mb-5 flex justify-between">
                    <div className=" rounded-lg p-2">
                        Effective on 10-13-2024
                    </div>
                    <div className=" rounded-lg p-2">
                        Last updated on 1-13-2024
                    </div>
                </div>
                <p className=" mb-5 rounded-2xl p-4">
                    {`Thanks for trusting 3841 Biscayne Beach
                    ('3841 Biscayne Beach', 'we', 'us', 'our') with your personal
                    information! We take our responsibility to you very
                    seriously, and so this Privacy Statement describes how we
                    handle your data. This Privacy Statement applies to all
                    websites we own and operate and to all services we provide
                    (collectively, the 'Services'). So Please Read This Privacy 
                    Statement Carefully. By using the Services, you are
                    expressly and voluntarily accepting the terms and conditions
                    of this Privacy Statement and our Terms of Service, which
                    include allowing us to process information about you. Under
                    this Privacy Statement, we are the data controller
                    responsible for processing your personal information. Our
                    contact information appears at the end of this Privacy
                    Statement.`}
                </p>

                <div className="mb-5 text-4xl font-bold">
                    Information We Collect
                </div>
                <div className="mb-2 text-xl ">Personal Information</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {` We may collect personal information, such as your name, 
                    email address, phone number, and other contact or 
                    identification information that you voluntarily provide to 
                    us when you interact with the Website, such as when you make
                     a booking or upon signing up.`}
                </p>
                <div className="mb-2 text-xl ">Password Security</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {` Your security is our priority. We use OAuth, a secure 
                    authentication protocol, to ensure the confidentiality of 
                    your account credentials. We never store your passwords 
                    directly. OAuth allows us to access your account securely 
                    without having access to your password, providing an extra 
                    layer of protection for your sensitive information.`}
                </p>
                {/* <div className="mb-2 text-xl "> Communication Preferences</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {` Providing your phone number is optional. If you choose 
                    to provide your phone number, we will use it to send appointment confirmations and essential communications related to your bookings.`}
                </p> */}

                <div className="mb-5 text-4xl font-bold">
                    How We Use Your Information
                </div>
                <div className="mb-2 text-xl ">Providing Services</div>

                <p className=" mb-5 rounded-2xl p-4 ">
                    {` We use your personal information to provide you with the 
                    services you request, such as creating a booking and 
                    communicating with you about your bookings.`}
                </p>
                <div className="mb-2 text-xl ">Communication</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`We may use your email address to send you transactional 
                    emails or messages related to your bookings. We may also 
                    send you promotional and marketing communications if you 
                    have opted in to receive them.`}
                </p>
                <div className="mb-2 text-xl ">Improving Our Services</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`We analyze usage data to improve the functionality and 
                    user experience of the Website and Services.`}
                </p>
                {/* <div className="mb-2 text-xl ">Phone Number Removal</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`If you wish to have your phone number removed from our records or stop receiving SMS notifications, please contact us at the provided contact information. We will promptly remove your phone number and cease sending messages to it upon your request.`}
                </p> */}
                <div className="mb-5 text-4xl font-bold">
                    Information Sharing and Disclosure
                </div>
                <div className="mb-2 text-xl ">Service Providers</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`We may share your personal information with third-party 
                    service providers who perform services on our behalf, 
                    such as payment processing, data analysis, email delivery, 
                    hosting services, and customer service.`}
                </p>
                <div className="mb-2 text-xl ">Legal Compliance</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`We may disclose your information if required by law, 
                    regulation, court order, or other governmental authority or 
                    when we believe in good faith that disclosure is necessary 
                    to protect our rights, protect your safety or the safety of 
                    others, investigate fraud, or respond to a government request.`}
                </p>

                <div className="mb-5 text-4xl font-bold">
                    How Do We Store Your Data?
                </div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`3841 Biscayne Beach stores your data securely in a database using Prisma and Neon.db, and stores cookies for authentication purposes.`}
                </p>

                <div className="mb-5 text-4xl font-bold">What Are Cookies?</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`Cookies are small pieces of text sent by your web browser 
                    by a website you visit. A cookie file is stored in your web 
                    browser and allows the Website or a third-party service to 
                    ecognize you and make your next visit easier and the Website more useful to you.`}
                </p>

                <div className="mb-5 text-4xl font-bold">
                    How Do We Use Cookies?
                </div>
                <div className="mb-2 text-xl ">Authentication</div>

                <p className=" mb-5 rounded-2xl p-4 ">
                    {`We use cookies to keep you signed in while you navigate 
                    our Website. These cookies are essential for the proper 
                    functioning of our authentication system.`}
                </p>
                <div className="mb-5 text-4xl font-bold">
                    Your Choices Regarding Cookies
                </div>
                <div className="mb-2 text-xl ">Disabling Cookies</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`You can choose to disable cookies through your individual 
                    browser options. However, please note that if you disable 
                    cookies, you may not be able to use some portions of our Website properly.`}
                </p>
                <div className="mb-2 text-xl ">Opting Out</div>
                <p className=" mb-5 rounded-2xl p-4 ">
                    {`You can opt-out of cookies by adjusting the settings in 
                    your web browser. Please refer to your browser's "help" section 
                    or a similar feature to learn more about how to manage cookie preferences.`}
                </p>

                <div className="mb-5 text-4xl font-bold">
                    What Are Your Data Protection Rights?
                </div>
                <p className=" mb-5 rounded-2xl p-4">
                    {` Every user is entitled
                    to the following: The right to access. You have the right
                    to request 3841 Biscayne Beach for copies of your personal data. We
                    may limit the number of times this request can be made to
                    depending on the size of the request. The right to
                    rectification. You have the right to request that
                    3841 Biscayne Beach correct any information you believe is
                    inaccurate. You also have the right to request 3841 Biscayne Beach to
                    complete the information you believe is incomplete. The
                    right to erasure. You have the right to request that
                    3841 Biscayne Beach erase your personal data, under certain
                    conditions. The right to restrict processing. You have the
                    right to request that 3841 Biscayne Beach restrict the processing of
                    your personal data, under certain conditions. The right to
                    object to processing. You have the right to object to
                    3841 Biscayne Beach processing of your personal data, under certain
                    conditions. The right to data portability. You have the
                    right to request that 3841 Biscayne Beach transfer the data that we
                    have collected to another organization, or directly to you,
                    under certain conditions.`}
                </p>

                <div className="mb-5 text-4xl font-bold">
                    Personal Information Request
                </div>
                <p className=" mb-5 rounded-2xl p-4">
                    You have the right to request access to the personal
                    information we collect from you, change that information, or
                    delete it. To request to review, update, or delete your
                    personal information, please email lynnthompson001@gmail.com
                    to request data stored.
                </p>
                <div className="mb-5 text-4xl font-bold">
                    Privacy Policy Modification
                </div>
                <p className=" mb-5 rounded-2xl p-4">
                    {`3841 Biscayne Beach may revise this Privacy Policy for its
                    Website at any time without prior notice. The updated
                    version will be indicated by an updated "Last Updated" date.
                    We encourage you to review this Cookie Policy periodically
                    to stay informed about how we use cookies.`}
                </p>
            </div>
        </>
    );
}
