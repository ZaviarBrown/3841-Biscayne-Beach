import { useEffect, useState } from "react";
import GalleryCard from "~/components/Gallery/Card";
import LoadingCard from "~/components/Gallery/Loading";
import { api } from "~/utils/api";

export default function Gallery() {
    const { data } = api.images.getAll.useQuery();
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (data && load < data.length) {
            const fade = setTimeout(() => setLoad(load + 1), 100);

            return () => clearTimeout(fade);
        }
    }, [data, load]);

    return (
        <>
            <div className="pt-20" />
            {data && (
                <div className="grid grid-cols-1 gap-5 bg-slate-500 p-5 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((url, i) => (
                        <GalleryCard url={url} i={i} key={i} load={load > i} />
                    ))}
                </div>
            )}
            {!data && (
                <div className="grid grid-cols-1 gap-5 bg-slate-500 p-5 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <LoadingCard key={i} />
                    ))}
                </div>
            )}
        </>
    );
}
