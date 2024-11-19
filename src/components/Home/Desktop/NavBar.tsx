import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function DesktopNavBar({
    hideNav,
    pathname,
}: {
    hideNav: boolean;
    pathname: string;
}) {
    const { data: session } = useSession();

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 flex h-16 transform items-center justify-between gap-5 border-b border-white p-4 text-center text-lg text-white ${
                hideNav ? '-translate-y-full' : 'translate-y-0'
            } bg-black bg-opacity-50 backdrop-blur transition-transform duration-700 `}
            aria-label='Main Navigation'
        >
            <Link
                className='min-w-fit text-2xl font-semibold'
                href='/'
                aria-label='Cheers Beaches'
            >
                Cheers Beaches
            </Link>

            <div className='flex items-center justify-end gap-5'>
                <ul className='flex items-center gap-8 text-left'>
                    <li>
                        <Link className='group relative' href='/gallery'>
                            Gallery
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 bg-white ${
                                    pathname === '/gallery'
                                        ? 'w-full'
                                        : 'w-0 transition-all duration-200 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link className='group relative' href='/house-rules'>
                            House Rules
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 bg-white ${
                                    pathname === '/house-rules'
                                        ? 'w-full'
                                        : 'w-0 transition-all duration-200 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    </li>
                    <li>
                        <Link className='group relative' href='/book'>
                            Book Now
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                    pathname === '/book'
                                        ? 'w-full'
                                        : 'w-0 transition-all duration-200 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    </li>
                    {/* <li>
                    <Link className="group relative" href="/reviews">
                        Reviews
                        <span
                            className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                pathname === "/reviews"
                                    ? "w-full"
                                    : "w-0 transition-all duration-200 group-hover:w-full"
                            }`}
                        ></span>
                    </Link>
                </li> */}
                    {session && (
                        <li>
                            <Link
                                className='group relative'
                                href='/your-bookings'
                            >
                                Your Bookings
                                <span
                                    className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                        pathname === '/your-bookings'
                                            ? 'w-full'
                                            : 'w-0 transition-all duration-200 group-hover:w-full'
                                    }`}
                                ></span>
                            </Link>
                        </li>
                    )}
                    {session && session.user.role === 'admin' && (
                        <li>
                            <Link className='group relative' href='/admin'>
                                Admin
                                <span
                                    className={`absolute -bottom-0.5 left-0 h-0.5  bg-white ${
                                        pathname === '/admin'
                                            ? 'w-full'
                                            : 'w-0 transition-all duration-200 group-hover:w-full'
                                    }`}
                                ></span>
                            </Link>
                        </li>
                    )}
                </ul>

                <button
                    onClick={() =>
                        session ? void signOut() : void signIn('google')
                    }
                    className='flex h-10 min-w-fit items-center justify-between rounded-3xl border px-3 py-1 text-xl transition-all duration-200 hover:scale-105'
                >
                    <Image
                        src='/assets/island.png'
                        alt='Island icon by icons8.com'
                        width={24}
                        height={24}
                    />

                    {session ? 'Sign out' : 'Sign in'}
                </button>
            </div>
        </nav>
    );
}
