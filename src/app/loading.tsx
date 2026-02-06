export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-background-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="size-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-4xl text-white">graphic_eq</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
