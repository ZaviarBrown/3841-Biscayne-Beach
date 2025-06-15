import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
    return (
        <div className="flex h-screen max-w-full flex-col overflow-hidden bg-bg">
            <div className="mb-10 mt-10">
                <div className="mx-24 flex flex-col md:flex-row">
                    <div className={`m-auto text-2xl text-slate-600`}>
                        <h1 className="text-6xl font-light">
                            <span>Feel at Home</span>
                        </h1>
                        <p className="mt-4 pr-16 font-light text-gray-700 lg:pr-32">
                            {`
                                Live the way you've always wanted without
                                compromising style or quality. At The Carson, our
                                large brand new construction homes are designed with
                                you in mind. With impressive finishes, two-car
                                direct access garages, and great amenities, our
                                brand-new construction homes make it possible to
                                live beyond your expectations. Walk out your front
                                door to Gilbert Town Square for a meal at your
                                favorite restaurant or take a short bike ride to the
                                famed Heritage District or a short drive to Downtown
                                Chandler for world-class dining & entertainment. The
                                Carson is the perfect place to call home.
                                `}
                        </p>
                    </div>

                    <div className="flex aspect-[480/280] h-80 flex-col text-4xl font-light md:w-1/3">
                        <Link
                            className="flex flex-1 items-center justify-start border-b border-l border-zinc-300 px-4 py-2 pl-8 text-center hover:bg-zinc-200"
                            href="/amenities/"
                        >
                            View Amenities
                        </Link>
                        <Link
                            className="flex flex-1 items-center justify-start border-l border-zinc-300 px-4 py-2 pl-8 text-center hover:bg-zinc-200"
                            href="/gallery/"
                        >
                            <p className="text-center">View Gallery</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex aspect-[3/2] w-full flex-col md:-mt-5 md:aspect-[300/84] md:flex-row">
                <div className="md:clip-tr clip-br relative h-full w-full overflow-hidden bg-cover bg-center md:h-auto md:w-1/2">
                    <Image
                        className="object-cover object-right-bottom"
                        src={"/images/house.jpg"}
                        alt={"0"}
                        fill
                    />
                </div>
                <div className="md:clip-tl clip-tl relative -mt-[7%] h-full w-full overflow-hidden bg-cover bg-center md:mt-0 md:h-auto md:w-1/2">
                    <Image
                        className="object-cover object-left-bottom"
                        src={"/images/house.jpg"}
                        alt={"0"}
                        fill
                    />
                </div>
            </div>
        </div>
    );
}
