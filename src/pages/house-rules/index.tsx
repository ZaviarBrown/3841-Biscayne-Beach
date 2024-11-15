import NavBarSpacer from '~/components/Home/NavBarSpacer';
import { useMobileContext } from '~/context/MobileContext';
import { rules, checkout, policies } from '~/data';

export default function HouseRules() {
    const { isMobile } = useMobileContext();

    return (
        <>
            <NavBarSpacer />

            <div className='m-5 flex flex-col items-center gap-10 p-5'>
                <div className='w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-base text-slate-800 shadow-3xl md:text-2xl'>
                    <h1 className='rounded-t-lg bg-slate-700 p-5 text-center text-lg text-white md:text-3xl'>
                        Please follow all Neighborhood Rules & please be
                        considerate of our neighbors right to peace and quiet.
                    </h1>
                    <div className='m-auto w-4/5 p-5'>
                        <ul className='grid grid-cols-1 gap-x-10 md:grid-cols-2'>
                            {rules.map((rule, i) => (
                                <li
                                    className='m-2 list-disc'
                                    key={`Rule #${i + 1}`}
                                >
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-base text-slate-800 shadow-3xl md:text-2xl'>
                    <h1 className='rounded-t-lg bg-slate-700 p-5 text-center text-lg text-white md:text-3xl'>
                        Please follow check-in/out procedures and leave the
                        house like you found it.
                    </h1>
                    <div className='m-auto w-4/5 p-5'>
                        <ul className='grid grid-cols-1 gap-x-10 md:grid-cols-2'>
                            {checkout.map((procedure, i) => (
                                <li
                                    className='m-2 list-disc'
                                    key={`Checkout #${i + 1}`}
                                >
                                    {procedure}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='w-3/4 min-w-[350px] flex-grow rounded-lg bg-white text-base text-slate-800 shadow-3xl md:text-2xl'>
                    <h1 className='rounded-t-lg bg-slate-700 p-5 text-center text-lg text-white md:text-3xl'>
                        Please note our Booking & Cancellation policies before
                        purchasing your booking.
                    </h1>
                    <div className='m-auto w-4/5 p-5'>
                        <ul className='grid grid-cols-1 gap-x-10 md:grid-cols-2'>
                            {policies.map((policy, i) => (
                                <li
                                    className='m-2 list-disc'
                                    key={`Policy #${i + 1}`}
                                >
                                    {policy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {isMobile ? (
                    <a
                        className='mb-5 self-center rounded-lg border-2 border-slate-200 bg-slate-700 p-2 text-center text-lg text-white shadow-3xl'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://utfs.io/f/01dbbee1-2b07-4019-a0a1-91b9f68dae74-mgt2ly.pdf'
                    >
                        Tap here to view Renters Rules PDF
                    </a>
                ) : (
                    <iframe
                        className='h-screen w-3/4 self-center p-10'
                        src='/assets/RentersRules.pdf'
                    />
                )}
            </div>
        </>
    );
}
