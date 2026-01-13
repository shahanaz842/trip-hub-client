const TicketCardSkeleton = () => {
    return (
        <div
            className="
              bg-white dark:bg-slate-900 rounded-xl 
              border border-slate-200 dark:border-slate-800
              flex flex-col md:flex-row overflow-hidden mb-4
              animate-pulse
            "
            aria-hidden="true"
        >
            {/* Left: Journey Info */}
            <div className="flex-grow p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">

                {/* Vendor Logo & Date */}
                <div className="flex md:flex-col items-center gap-3 min-w-[100px]">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Route Visual */}
                <div className="flex items-center gap-4 flex-grow w-full md:w-auto">
                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />

                    <div className="flex-grow flex items-center relative">
                        <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="absolute left-1/2 -translate-x-1/2 h-4 w-6 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
            </div>

            {/* Right: Pricing & Action */}
            <div
                className="
                  p-5 md:p-6 bg-slate-50/50 dark:bg-slate-800/20
                  border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800
                  flex flex-row md:flex-col items-center justify-between md:justify-center
                  min-w-[160px] gap-2
                "
            >
                <div className="text-left md:text-center space-y-2">
                    <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                </div>

                <div className="w-24 md:w-full h-8 rounded-lg bg-slate-300 dark:bg-slate-700" />
            </div>
        </div>
    );
};

export default TicketCardSkeleton;
