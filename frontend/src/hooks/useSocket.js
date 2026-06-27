'use client';

import { getClientId } from '@/lib/clientId';
import { getSocket } from '@/lib/socket';
import { useEffect, useState } from 'react';

export const useSocket = ({ onSync, onCreated, onUpdated, onDeleted }) => {
  const [status, setStatus] = useState('connecting');
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const socket = getSocket();
    const clientId = getClientId();

    const shouldIgnore = (originClientId) =>
      originClientId && originClientId === clientId;

    const handleConnect = () => setStatus('connected');
    const handleDisconnect = () => setStatus('reconnecting');
    const handleConnectError = () => setStatus('reconnecting');

    const handleBoardSync = ({ cards }) => onSync?.(cards);

    const handleCardCreated = (payload) => {
      if (!shouldIgnore(payload.originClientId)) onCreated?.(payload.card);
    };

    const handleCardUpdated = (payload) => {
      if (!shouldIgnore(payload.originClientId)) onUpdated?.(payload.card);
    };

    const handleCardDeleted = (payload) => {
      if (!shouldIgnore(payload.originClientId)) onDeleted?.(payload.id);
    };

    const handlePresenceUpdate = ({ count }) => setOnlineCount(count);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('board:sync', handleBoardSync);
    socket.on('card:created', handleCardCreated);
    socket.on('card:updated', handleCardUpdated);
    socket.on('card:deleted', handleCardDeleted);
    socket.on('presence:update', handlePresenceUpdate);

    socket.connect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('board:sync', handleBoardSync);
      socket.off('card:created', handleCardCreated);
      socket.off('card:updated', handleCardUpdated);
      socket.off('card:deleted', handleCardDeleted);
      socket.off('presence:update', handlePresenceUpdate);
      socket.disconnect();
    };
  }, [onSync, onCreated, onUpdated, onDeleted]);

  return { status, onlineCount };
};