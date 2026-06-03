import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/config/firebase';

export const requestNotificationPermission = async () => {
  try {
    const msg = await messaging();
    if (!msg) return;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(msg, {
        vapidKey: 'YOUR_PUBLIC_VAPID_KEY_FROM_FIREBASE'
      });
      console.log('FCM Token:', token);
      // Kirim token ke backend via API
      // await api.post('/user/fcm-token', { token });
    }
  } catch (error) {
    console.error('Error FCM:', error);
  }
};

export const onForegroundMessage = async () => {
  const msg = await messaging();
  if (!msg) return;

  onMessage(msg, (payload) => {
    console.log('Message received: ', payload);
    // Tampilkan toast kustom
  });
};
