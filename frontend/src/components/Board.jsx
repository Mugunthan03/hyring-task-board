'use client';

import { useCallback, useMemo } from 'react';
import {
    DndContext,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useBoard } from '@/hooks/useBoard';
import { useSocket } from '@/hooks/useSocket';
import { COLUMNS } from '@/lib/constants';
import { BoardHeader } from './BoardHeader';
import { Column } from './Column';

const BoardSkeleton = () => (
    <div className="board-page min-h-screen">
        <div className="h-[120px] skeleton" />
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="board-shell rounded-xl border border-[#dcdfe4] bg-white p-6">
                <div className="grid gap-5 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                            <div className="h-10 skeleton rounded-lg" />
                            <div className="h-24 skeleton rounded-lg" />
                            <div className="h-24 skeleton rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const Board = () => {
    const {
        cards,
        loading,
        error,
        addCard,
        renameCard,
        moveCard,
        removeCard,
        syncCards,
        applyCreated,
        applyUpdated,
        applyDeleted,
    } = useBoard();

    const { status, onlineCount } = useSocket({
        onSync: syncCards,
        onCreated: applyCreated,
        onUpdated: applyUpdated,
        onDeleted: applyDeleted,
    });

    const cardsByStatus = useMemo(
        () =>
            COLUMNS.reduce((acc, col) => {
                acc[col.id] = cards.filter((c) => c.status === col.id).length;
                return acc;
            }, {}),
        [cards]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const handleDragEnd = useCallback(
        async (event) => {
            const { active, over } = event;
            if (!over) return;

            const activeCard = cards.find((c) => c.id === active.id);
            if (!activeCard) return;

            const overColumnId = COLUMNS.some((col) => col.id === over.id)
                ? over.id
                : cards.find((c) => c.id === over.id)?.status;

            if (!overColumnId) return;

            const columnCards = cards
                .filter((c) => c.status === overColumnId)
                .sort((a, b) => a.position - b.position);

            const oldIndex = columnCards.findIndex((c) => c.id === active.id);
            let newIndex = columnCards.findIndex((c) => c.id === over.id);

            if (newIndex === -1) newIndex = columnCards.length;

            const reordered =
                activeCard.status === overColumnId && oldIndex !== -1
                    ? arrayMove(columnCards, oldIndex, newIndex)
                    : [...columnCards.filter((c) => c.id !== active.id)];

            if (activeCard.status !== overColumnId) {
                reordered.splice(newIndex, 0, { ...activeCard, status: overColumnId });
            }

            const finalIndex = reordered.findIndex((c) => c.id === active.id);
            await moveCard(activeCard.id, overColumnId, finalIndex);
        },
        [cards, moveCard]
    );

    if (loading) return <BoardSkeleton />;

    return (
        <div className="board-page min-h-screen">
            <BoardHeader
                status={status}
                onlineCount={onlineCount}
                totalCards={cards.length}
                cardsByStatus={cardsByStatus}
            />

            <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="board-shell overflow-hidden rounded-xl border border-[#dcdfe4] bg-white">
                    <div className="border-b border-[#dcdfe4] bg-[#fafbfc] px-5 py-3">
                        <h2 className="text-sm font-semibold text-[#172b4d]">Project Board</h2>
                        <p className="text-xs text-[#5e6c84]">
                            Drag cards to reorder or move between columns · Click a card to edit
                        </p>
                    </div>

                    <div className="p-5">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="grid gap-5 lg:grid-cols-3">
                                {COLUMNS.map((column) => (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        cards={cards}
                                        onAdd={addCard}
                                        onRename={renameCard}
                                        onDelete={removeCard}
                                    />
                                ))}
                            </div>
                        </DndContext>
                    </div>
                </div>
            </div>
        </div>
    );
};
