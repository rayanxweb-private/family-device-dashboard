import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDeviceStore } from '@/store/use-device-store';
import { auth } from '@/config/firebase';

let socket: Socket | null = null;

export const useSocket = () => {
  const updateDeviceRealtime = useDeviceStore((state) => state.updateDeviceRealtime);

  useEffect(() => {
    const initSocket = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
          auth: { token },
          transports: ['websocket'],
        });

        socket.on('device:status', (data: { deviceId: string; isOnline: boolean; batteryLevel: number; lastSeen: string }) => {
          updateDeviceRealtime(data.deviceId, {
            isOnline: data.isOnline,
            batteryLevel: data.batteryLevel,
            lastSeen: data.lastSeen,
          });
        });
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [updateDeviceRealtime]);

  const emitAction = (event: string, payload: any) => {
    if (socket) socket.emit(event, payload);
  };

  return { emitAction };
};
