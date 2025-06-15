export default function DarkFilter() {
    return (
        <>
            <div className="absolute top-0 -z-40 h-1/2 w-full bg-gradient-to-b from-black to-transparent opacity-75" />
            <div className="absolute bottom-0 -z-40 h-1/2 w-full bg-gradient-to-b from-transparent to-black opacity-75" />
        </>
    );
}
