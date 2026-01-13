import React from 'react';

const NoResults = ({ onReset, isResetting }) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 mt-10 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                No Journeys Found
            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center leading-relaxed mb-8">
                We couldn't find any tickets matching your search. Try adjusting your filters or date.
            </p>

            {onReset && (
                <button
                    onClick={onReset}
                    disabled={isResetting} // Disable while loading
                    className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isResetting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Resetting...
                        </>
                    ) : (
                        "Reset All Filters"
                    )}
                </button>
            )}
        </div>
    );
};

export default NoResults;