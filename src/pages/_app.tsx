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
import { MobileContextProvider } from "~/context/MobileContext";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <>
            <SessionProvider session={session}>
                <MobileContextProvider>
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
                </MobileContextProvider>
            </SessionProvider>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-EGSWZS95SK" />
            <script
                id="Google tag"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-EGSWZS95SK');
                        `,
                }}
            ></script>
        </>
    );
};

export default api.withTRPC(MyApp);
