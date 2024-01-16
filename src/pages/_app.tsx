import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "react-day-picker/dist/style.css";
import Layout from "~/components/layout";
import { BookingContextProvider } from "~/context/BookingContext";
import { ScrollContextProvider } from "~/context/ScrollContext";
import { Modal, ModalContextProvider } from "~/context/ModalContext";
import "default-passive-events";
import React, { ErrorInfo } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <ScrollContextProvider>
                <ModalContextProvider>
                    <BookingContextProvider>
                        <Modal />
                        <Layout>
                            <ErrorBoundary>
                                <Component {...pageProps} />
                            </ErrorBoundary>
                        </Layout>
                    </BookingContextProvider>
                </ModalContextProvider>
            </ScrollContextProvider>
        </SessionProvider>
    );
};

class ErrorBoundary extends React.Component {
    constructor(props: React.Component) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI

        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            );
        }

        // Return children components in case of no error

        return this.props.children;
    }
}

export default api.withTRPC(MyApp);
