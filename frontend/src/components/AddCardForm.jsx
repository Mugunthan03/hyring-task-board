'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

export const AddCardForm = ({ column, onAdd }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onAdd(title.trim());
        setTitle('');
        setOpen(false);
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[#c1c7d0] bg-[#fafbfc] px-3 py-1.5 text-xs font-medium text-[#5e6c84] transition hover:border-[#8993a4] hover:bg-white hover:text-[#172b4d]"
            >
                <Plus className="h-3.5 w-3.5" />
                Add a card
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2 rounded-md border border-[#dcdfe4] bg-[#fafbfc] p-2">
            <textarea
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                rows={2}
                className="w-full resize-none rounded border border-[#dcdfe4] bg-white px-2.5 py-1.5 text-[13px] text-[#172b4d] outline-none placeholder:text-[#8993a4] focus:border-[#0c66e4] focus:ring-2 focus:ring-[#0c66e4]/20"
            />
            <div className="flex items-center gap-1.5">
                <button
                    type="submit"
                    className={`rounded px-3 py-1 text-xs font-semibold text-white transition ${column.btn}`}
                >
                    Add card
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setOpen(false);
                        setTitle('');
                    }}
                    className="rounded px-2 py-1 text-xs font-medium text-[#5e6c84] hover:text-[#172b4d]"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
