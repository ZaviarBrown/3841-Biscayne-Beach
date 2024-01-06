import Link from "next/link";
import NavBarSpacer from "~/components/NavBarSpacer";

export default function TermsOfService() {
    return (
        <>
            <NavBarSpacer />
            <div className="m-6 w-1/2 self-center text-white">
                <div className="flex justify-center text-5xl font-bold">
                    Terms of Service
                </div>
                <div className="mb-5 flex text-white">
                    Last updated on 12-25-2023
                </div>
                <div className="font-boldfont-bold mb-5 text-4xl">
                    {" "}
                    Agreement
                </div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`These Terms of Service govern your use of this website 
                    located at 3841biscaynebeach.com. 
                    Please read these Terms of Service carefully
                    before accessing or using the Website. By accessing this
                    Website, you are agreeing to be bound by these Website Terms
                     of Service and agree that you are responsible for the agreement in
                    accordance with any applicable local laws. IF YOU DO NOT
                    AGREE TO ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU
                    ARE NOT PERMITTED TO ACCESS OR USE OUR SERVICES.`}
                </p>
                <div className="font-boldfont-bold mb-5 text-4xl">
                    {" "}
                    Use of the Website
                </div>
                <div className="mb-2 text-xl "> Eligibility</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` You must be at least 18 years old to use the Website. 
                    By using the Website, you represent and warrant that you are at least 18 years old.`}
                </p>
                <div className="mb-2 text-xl "> Personal Information</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` You agree to provide accurate, current, and complete 
                    information during the booking process and to update such 
                    information to keep it accurate, current, and complete.`}
                </p>
                <div className="mb-2 text-xl "> Prohibited Activities</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` You may not use the Website for any illegal or 
                    unauthorized purpose. You may not, in the use of the 
                    Website, violate any applicable laws, regulations, or rights of others.`}
                </p>
                <div className="mb-5 text-4xl font-bold">
                    Bookings and Services
                </div>
                <div className="mb-2 text-xl "> Bookings</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`3841 Biscayne Beach offers online booking 
                    services through our Website. All bookings are subject to 
                    availability. By making a booking through our Website, you 
                    agree to abide by the terms and conditions outlined in this section.`}
                </p>
                <div className="mb-2 text-xl "> Right to Refuse Service</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`  3841 Biscayne Beach reserves the right to refuse service
                     to anyone for any reason at any time. We take pride in 
                     providing a safe and respectful environment for everyone.`}
                </p>
                <div className="mb-2 text-xl ">
                    Cancellation and Modification of Bookings
                </div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`If you need to cancel your booking, you can do so by 
                    reviewing the cancellation policy, which can be found on 
                    the Website. Failure to adhere to the cancellation policy may result in applicable fees or penalties.`}
                </p>
                <div className="mb-2 text-xl ">{`Host's Right to Cancel`}</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`In rare circumstances, 3841 Biscayne Beach may need to cancel a booking due to unforeseen events or emergencies. In such cases, we will make every effort to reschedule your booking at a convenient time for you, or provide a full refund.`}
                </p>
                <div className="mb-2 text-xl ">Rescheduling Bookings</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`If you wish to reschedule a booking, you are required to 
                    reach out to 3841 Biscayne Beach promptly. Please contact us 
                    via our contact email to discuss the options for rescheduling 
                    your booking.`}
                </p>
                <div className="mb-2 text-xl ">Booking through the Website</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`When creating a booking through our Website, you agree
                     that you are bound by our cancellation policy. 
                     Booking through the site indicates your acceptance of the 
                     terms and conditions related to cancellations and modifications.`}
                </p>
                <div className="mb-5 text-4xl font-bold">
                    {" "}
                    Cancellation Policy
                </div>
                <div className="mb-2 text-xl ">Card Processing Fee</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`All payments on the Website use Stripe and incur a 
                    non-refundable 6% card processing fee. Any mention of refunds 
                    in this section include this fee.`}
                </p>
                <div className="mb-2 text-xl ">Cancellation Charges</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`Bookings canceled with more than 10 days notice will receive a full refund. 
                    Bookings canceled with less than 10 days notice will 
                    receive a refund equivalent to 50% of the total booking cost. 
                    Bookings canceled with less than 3 days notice will receive 
                    no refund.`}
                </p>
                <div className="mb-5 text-4xl font-bold">
                    {" "}
                    Intellectual Property
                </div>
                <div className="mb-2 text-xl "> Ownership</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` All content and materials available on the Website, 
                    including but not limited to text, graphics, logos, button 
                    icons, images, audio clips, data compilations, and software, 
                    are the property of 3841 Biscayne Beach or its content suppliers 
                    and protected by copyright laws.`}
                </p>
                <div className="mb-2 text-xl "> Trademarks</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` 3841 Biscayne Beach and any other trademarks, service 
                    marks, graphics, and logos used in connection with the 
                    Website are trademarks or registered trademarks of 3841 Biscayne Beach or its licensors.`}
                </p>
                <div className="mb-5 text-4xl font-bold">
                    Terms of Service Modification
                </div>
                <p className=" mb-5 rounded-2xl p-4 text-white">
                    3841 Biscayne Beach may revise these Terms of Service for
                    its Website at any time without prior notice. By using this
                    Website, you are agreeing to be bound by the current version
                    of these Terms of Service.
                </p>
                {/* <div className="mb-5 text-4xl font-bold">Review Policy</div>
                <div className="mb-2 text-xl ">Content Moderation</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`At 3841 Biscayne Beach, we value honest feedback and 
                    reviews from our customers. We encourage you to share your 
                    experiences on our Website. However, we reserve the right to
                     moderate and remove any review that is deemed offensive, 
                     inappropriate, or violates our content guidelines.`}
                </p>
                <div className="mb-2 text-xl ">Offensive Content</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`Reviews that contain offensive language, discriminatory remarks, or violate the privacy of our staff or other customers will be promptly removed. We believe in maintaining a respectful and positive online environment for everyone.`}
                </p>{" "}
                <div className="mb-2 text-xl ">Moderation Process </div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`Our moderation process aims to ensure that the reviews displayed on our Website are constructive, helpful, and relevant to the experiences of our customers. While we encourage your honest opinions, we request that you express them in a respectful manner.`}
                </p>{" "}
                <div className="mb-2 text-xl "> Right to Remove</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`We have the ability to remove any review that we find offensive to others. If you believe your review was removed in error, please contact our customer support team at lynnthompson001@gmail.com to address your concerns.`}
                </p>{" "}
                <div className="mb-2 text-xl "> Feedback Welcome</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`We appreciate your understanding and cooperation in maintaining a respectful review environment. If you have any feedback or questions about our review policy, please feel free to reach out to us.`}
                </p>{" "} */}
                <div className="mb-5 text-4xl font-bold"> Privacy Policy</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    If you use our Services, you must abide by our{" "}
                    <Link
                        href="/legal/privacy-policy"
                        aria-label="privacy policy"
                        className="text-blue-300 underline"
                    >
                        Privacy Policy
                    </Link>
                    {`. You acknowledge that you have read our Privacy Policy and
                    understand that it sets forth how we collect, use, and store
                    your information. If you do not agree with our Privacy
                    Statement, then you must stop using the Services
                    immediately. Any person, entity, or service collecting data
                    from the Services must comply with our Privacy Statement.
                    Misuse of any Users Personal Information is
                    prohibited. If you collect any Personal Information from a
                    User, you agree that you will only use the Personal
                    Information you gather for the purpose for which the User
                    has authorized it. You agree that you will reasonably secure
                    any Personal Information you have gathered from the
                    Services, and you will respond promptly to complaints,
                    removal requests, and do not contact requests
                    from us or Users.`}
                </p>
                <div className="mb-5 text-4xl font-bold"> Limitations</div>
                <p className=" mb-5 rounded-2xl p-4 text-white">
                    {`To the fullest extent permitted by applicable law, 
                    3841 Biscayne Beach shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, or any loss of
                    profits or revenues, whether incurred directly or
                    indirectly, or any loss of data, use, goodwill, or other
                    intangible losses, resulting from (a) your use or inability
                    to use the Website; (b) any unauthorized access to or use of
                    our servers and/or any personal information stored therein.`}
                </p>
                <div className="mb-5 text-4xl font-bold"> Disclaimer</div>
                <div className="mb-2 text-xl "> Accuracy of Information</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`While we strive to provide accurate and up-to-date 
                    information on our Website, 3841 Biscayne Beach makes no 
                    representations or warranties of any kind, express or 
                    implied, about the completeness, accuracy, reliability, 
                    suitability, or availability concerning the Website or the 
                    information, products, services, or related graphics 
                    contained on the Website for any purpose. Any reliance you 
                    place on such information is therefore strictly at your own risk.`}
                </p>
                <div className="mb-2 text-xl ">Service Availability</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {` 3841 Biscayne Beach reserves the right to modify, 
                    suspend, or discontinue any part of the Website or the 
                    services provided at any time without prior notice. We will 
                    not be liable if, for any reason, all or any part of the 
                    Website is unavailable at any time or for any period.`}
                </p>
                <div className="mb-2 text-xl ">Third-Party Links </div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`Our Website may contain links to third-party websites or 
                    services that are not owned or controlled by 3841 Biscayne Beach. 
                    We have no control over and assume no responsibility for the 
                    content, privacy policies, or practices of any third-party 
                    websites or services. You further acknowledge and agree that 
                    3841 Biscayne Beach shall not be responsible or liable, 
                    directly or indirectly, for any damage or loss caused or 
                    alleged to be caused by or in connection with the use of or 
                    reliance on any such content, goods, or services available 
                    on or through any such websites or services.`}
                </p>
                <div className="mb-2 text-xl "> User Responsibilities</div>
                <p className=" mb-5 rounded-2xl p-4 text-white ">
                    {`Users are responsible for their interactions with other 
                    users and third parties. 3841 Biscayne Beach disclaims any 
                    liability arising from such interactions. Users are also 
                    responsible for maintaining the confidentiality of their 
                    account information and for ensuring the security of their passwords.`}
                </p>
            </div>
        </>
    );
}
