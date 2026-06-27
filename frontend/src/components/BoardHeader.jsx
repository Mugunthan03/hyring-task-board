'use client';

import { COLUMNS } from '@/lib/constants';
import { ConnectionStatus } from './ConnectionStatus';

export const BoardHeader = ({ status, onlineCount, totalCards, cardsByStatus }) => {
  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff6ff] text-sm font-semibold text-[#2563eb]">
              HT
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight text-[#0f172a] sm:text-lg">
                Hyring Task Board
              </h1>
              <p className="text-xs text-[#64748b] sm:text-sm">
                Real-time collaboration · Live sync enabled
              </p>
            </div>
          </div>

          <ConnectionStatus status={status} onlineCount={onlineCount} />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[#f1f5f9] py-3">
          <StatPill label="Total" value={totalCards} active />
          {COLUMNS.map((col) => (
            <StatPill
              key={col.id}
              label={col.label}
              value={cardsByStatus[col.id] ?? 0}
              dotColor={col.topBar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatPill = ({ label, value, active, dotColor }) => (
  <div
    className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium ${
      active
        ? 'border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a]'
        : 'border-transparent bg-[#f8fafc] text-[#64748b]'
    }`}
  >
    {dotColor && <span className={`h-2 w-2 rounded-full ${dotColor}`} />}
    <span>{label}</span>
    <span className="rounded bg-white px-1.5 py-0.5 font-semibold text-[#334155] shadow-sm ring-1 ring-[#e2e8f0]">
      {value}
    </span>
  </div>
);
