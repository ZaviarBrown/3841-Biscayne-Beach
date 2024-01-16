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
                            <Component {...pageProps} />
                        </Layout>
                    </BookingContextProvider>
                </ModalContextProvider>
            </ScrollContextProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
