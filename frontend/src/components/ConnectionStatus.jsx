'use client';

import { Users, Wifi, WifiOff } from 'lucide-react';

export const ConnectionStatus = ({ status, onlineCount, dark = false }) => {
    const isConnected = status === 'connected';

    if (dark) {
        return (
            <div className="flex flex-wrap items-center gap-2">
                <div
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium sm:text-sm ${isConnected
                            ? 'bg-[#22a06b26] text-[#7ee2b8]'
                            : 'bg-[#f5cd4726] text-[#f5cd47]'
                        }`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-[#4bce97]' : 'bg-[#f5cd47]'
                            }`}
                    />
                    {isConnected ? (
                        <>
                            <Wifi className="h-3.5 w-3.5" />
                            Connected
                        </>
                    ) : (
                        <>
                            <WifiOff className="h-3.5 w-3.5" />
                            Reconnecting
                        </>
                    )}
                </div>

                <div className="flex items-center gap-1.5 rounded-md bg-[#ffffff14] px-3 py-1.5 text-xs font-medium text-[#b6c2cf] sm:text-sm">
                    <Users className="h-3.5 w-3.5" />
                    {onlineCount} online
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium ${isConnected
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-amber-200 bg-amber-50 text-amber-700'
                    }`}
            >
                <span
                    className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                />
                {isConnected ? (
                    <>
                        <Wifi className="h-4 w-4" />
                        Connected
                    </>
                ) : (
                    <>
                        <WifiOff className="h-4 w-4" />
                        Reconnecting…
                    </>
                )}
            </div>

            <div className="flex items-center gap-1.5 rounded-md border border-[#dfe1e6] bg-white px-3 py-1.5 text-sm text-[#626f86]">
                <Users className="h-4 w-4" />
                {onlineCount} online
            </div>
        </div>
    );
};
