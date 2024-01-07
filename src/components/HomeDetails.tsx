import type { HomeDetailsType } from "~/pages";
import ParallaxImage from "./ParallaxImage";

const ParallaxDetailScene = ({
    src,
    alt,
    side,
    text,
}: {
    src: string;
    alt: string;
    side: number;
    text: string;
}) => {
    const textArr = text.split(".");

    return (
        <>
            <ParallaxImage src={src} alt={alt}>
                <div className="flex h-full w-full">
                    {side === 1 && <div className="w-2/3" />}
                    <div
                        className={`flex w-1/3 flex-col items-center justify-center gap-5 backdrop-blur-sm ${
                            side === 0 ? "border-r" : "border-l"
                        } border-white bg-black bg-opacity-80 p-5 text-center text-white`}
                    >
                        {textArr.map((text, i) => {
                            return (
                                <p
                                    key={i}
                                    className="w-full break-words p-3 text-2xl"
                                >
                                    {text}.
                                </p>
                            );
                        })}
                    </div>
                    {side === 0 && <div className="w-2/3" />}
                </div>
            </ParallaxImage>
        </>
    );
};

export default function HomeDetails({
    homeDetails,
}: {
    homeDetails: HomeDetailsType[];
}) {
    return (
        <>
            {homeDetails.map((details, i) => {
                return (
                    <ParallaxDetailScene
                        key={details.alt}
                        {...details}
                        side={i % 2}
                    />
                );
            })}
        </>
    );
}
