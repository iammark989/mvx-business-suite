export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                <img
                    src="/images/magnavertex-logo.jpg"
                    alt="Magna Vertex Technologies"
                    className="size-full object-contain"
                />
            </div>

            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold">
                    MVX Business Suite
                </span>
            </div>
        </>
    );
}