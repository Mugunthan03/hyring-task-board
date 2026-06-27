'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { formatCardDate } from '@/lib/constants';

export const TaskCard = ({ card, column, onRename, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(card.title);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card.id, data: { card } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.9 : 1,
        zIndex: isDragging ? 10 : 1,
    };

    const saveTitle = async () => {
        const trimmed = title.trim();
        if (!trimmed || trimmed === card.title) {
            setTitle(card.title);
            setEditing(false);
            return;
        }
        await onRename(card.id, trimmed);
        setEditing(false);
    };

    const dateLabel = formatCardDate(card.updatedAt || card.createdAt);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative rounded-md border border-[#dcdfe4] border-l-[3px] ${column.cardAccent} bg-white shadow-[0_1px_2px_rgba(9,30,66,0.06)] transition ${column.cardHover} hover:shadow-[0_2px_8px_rgba(9,30,66,0.08)]`}
        >
            <div className="px-2.5 py-2">
                <div className="flex items-start gap-1">
                    <button
                        {...attributes}
                        {...listeners}
                        className="mt-px cursor-grab rounded p-0.5 text-[#8993a4] opacity-0 transition group-hover:opacity-100 hover:bg-[#f1f2f4] hover:text-[#5e6c84] active:cursor-grabbing"
                        aria-label="Drag card"
                    >
                        <GripVertical className="h-3.5 w-3.5" />
                    </button>

                    <div className="min-w-0 flex-1">
                        {editing ? (
                            <textarea
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={saveTitle}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        saveTitle();
                                    }
                                    if (e.key === 'Escape') {
                                        setTitle(card.title);
                                        setEditing(false);
                                    }
                                }}
                                className="w-full resize-none rounded border border-[#0c66e4] bg-white px-2 py-1 text-[13px] leading-tight text-[#172b4d] outline-none ring-2 ring-[#0c66e4]/20"
                                rows={1}
                            />
                        ) : (
                            <p
                                onClick={() => setEditing(true)}
                                className="cursor-text text-[13px] font-medium leading-tight text-[#172b4d]"
                            >
                                {card.title}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#f1f2f4] px-2.5 py-1">
                {dateLabel ? (
                    <span className="text-[10px] font-medium text-[#8993a4]">{dateLabel}</span>
                ) : (
                    <span />
                )}

                <div className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
                    <button
                        onClick={() => setEditing(true)}
                        className="rounded p-0.5 text-[#8993a4] hover:bg-[#f1f2f4] hover:text-[#0c66e4]"
                        aria-label="Edit card"
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button
                        onClick={() => onDelete(card.id)}
                        className="rounded p-0.5 text-[#8993a4] hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete card"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};
