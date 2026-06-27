'use client';

import { TaskCard } from '@/components/TaskCard';
import { AddCardForm } from './AddCardForm';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Inbox } from 'lucide-react';

export const Column = ({ column, cards, onAdd, onRename, onDelete }) => {
    const { setNodeRef, isOver } = useDroppable({ id: column.id });

    const columnCards = cards
        .filter((c) => c.status === column.id)
        .sort((a, b) => a.position - b.position);

    return (
        <div
            className={`flex min-h-[440px] flex-col overflow-hidden rounded-lg border border-[#dcdfe4] bg-[#f7f8f9] transition ${isOver ? `ring-2 ${column.ring}` : ''
                }`}
        >
            <div className={`h-0.5 ${column.topBar}`} />

            <div className="border-b border-[#dcdfe4] bg-white px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h3 className={`text-[13px] font-semibold ${column.header}`}>
                            {column.label}
                        </h3>
                        <p className="text-[11px] text-[#5e6c84]">{column.description}</p>
                    </div>
                    <span
                        className={`shrink-0 rounded-full px-2 py-px text-[11px] font-bold ${column.badge}`}
                    >
                        {columnCards.length}
                    </span>
                </div>
            </div>

            <div ref={setNodeRef} className="flex flex-1 flex-col gap-1.5 p-2">
                <SortableContext
                    items={columnCards.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {columnCards.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-[#c1c7d0] bg-white/60 px-3 py-6 text-center">
                            <Inbox className="mb-1.5 h-6 w-6 text-[#c1c7d0]" strokeWidth={1.5} />
                            <p className="text-xs font-medium text-[#5e6c84]">No tasks here</p>
                            <p className="mt-0.5 text-[11px] text-[#8993a4]">
                                Add a card or drag one into this column
                            </p>
                        </div>
                    ) : (
                        columnCards.map((card) => (
                            <TaskCard
                                key={card.id}
                                card={card}
                                column={column}
                                onRename={onRename}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </SortableContext>
            </div>

            <div className="border-t border-[#dcdfe4] bg-white p-2">
                <AddCardForm column={column} onAdd={(title) => onAdd(title, column.id)} />
            </div>
        </div>
    );
};
