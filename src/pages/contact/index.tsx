import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NavBarSpacer from "~/components/Home/NavBarSpacer";
import { api } from "~/utils/api";
import { render } from "@react-email/render";
import ContactMessageEmail from "~/emails/ContactMessage";
import { PulseLoader } from "react-spinners";
import { useMobileContext } from "~/context/MobileContext";

export default function ContactForm() {
    const { data: session } = useSession();
    const { isMobile } = useMobileContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [startFade, setStartFade] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { mutate: sendEmail } = api.contact.contactSupportEmail.useMutation({
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setStartFade(true), 250);
        },
        onError: () => {
            setShowErrors(true);
            setHasSubmitted(false);
        },
    });

    useEffect(() => {
        if (session?.user.name) {
            setName(session.user.name);
        }
        if (session?.user.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        if (!name || !email || !message) setDisabled(true);
        else setDisabled(false);
    }, [name, email, message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setShowErrors(false);
        setHasSubmitted(true);

        sendEmail({
            replyTo: email,
            subject: `${name}'s Contact Message`,
            html: render(
                <ContactMessageEmail
                    name={name}
                    email={email}
                    message={message}
                />
            ),
        });
    };

    return (
        <>
            <NavBarSpacer />
            {showSuccess && (
                <div
                    className={`m-auto rounded-xl ${
                        isMobile ? "w-4/5 max-w-96" : ""
                    } bg-white p-5 shadow-3xl transition-opacity duration-500 ${
                        startFade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h1 className="mb-10 text-center text-3xl">
                        Message Sent Successfully
                    </h1>
                    <p className="break-words text-center text-2xl">{`We'll reach out to you at ${email} as soon as we can!`}</p>
                </div>
            )}
            {!showSuccess && (
                <form
                    onSubmit={handleSubmit}
                    className={`m-auto flex ${
                        isMobile ? "w-4/5 max-w-96" : "w-96"
                    } flex-col gap-4 rounded-xl bg-white p-5 shadow-3xl`}
                >
                    {" "}
                    <h1
                        className={`text-center text-3xl ${
                            hasSubmitted ? "opacity-50" : ""
                        }`}
                    >
                        Contact Us
                    </h1>
                    {showErrors && (
                        <div className="text-center text-xl text-red-500">
                            Something went wrong. Verify your email is correct
                            and try again.
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        disabled={hasSubmitted}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md border border-gray-300 p-2 disabled:bg-black disabled:bg-opacity-10 disabled:opacity-50"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        disabled={hasSubmitted}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md border border-gray-300 p-2 disabled:bg-black disabled:bg-opacity-10 disabled:opacity-50"
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        disabled={hasSubmitted}
                        onChange={(e) => setMessage(e.target.value)}
                        className="h-32 rounded-md border border-gray-300 p-2 disabled:bg-black disabled:bg-opacity-10 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={disabled || hasSubmitted}
                        className={`h-10 rounded-md bg-blue-500 px-4 py-2 text-white duration-300 hover:scale-[1.02] hover:bg-blue-600 disabled:scale-100 ${
                            hasSubmitted
                                ? "disabled:bg-blue-300"
                                : "disabled:bg-slate-400"
                        }`}
                    >
                        {hasSubmitted ? (
                            <PulseLoader
                                size={10}
                                color="white"
                                className="m-auto"
                            />
                        ) : (
                            "Send"
                        )}
                    </button>
                </form>
            )}
        </>
    );
}
