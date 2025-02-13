import { homeDetails } from "~/data";
import { ParallaxDetailScene } from "./Parallax";

export default function HomeDetails() {
    return (
        <>
            {homeDetails.map((details) => {
                return <ParallaxDetailScene key={details.alt} {...details} />;
            })}
        </>
    );
}
