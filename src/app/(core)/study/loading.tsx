export default function Loading() {
    return (
        <div className="h-screen w-full p-4 flex flex-col gap-4">
            <div className="w-100 h-5 rounded bg-stone-700 animate-pulse"></div>
            <div className="w-100 h-10 rounded bg-stone-700 animate-pulse"></div>
            <div className="flex gap-2 w-full">
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
            </div>
            <div className="w-100 h-10 rounded bg-stone-700 animate-pulse"></div>
            <div className="flex gap-2 w-full">
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
                <div className="h-60 w-full rounded animate-pulse bg-stone-700"></div>
            </div>
        </div>
    )
}