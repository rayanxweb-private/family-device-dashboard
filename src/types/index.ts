export type DeviceStatus = 'online' | 'offline';

export interface Device {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  appVersion: string;
  batteryLevel: number;
  isOnline: boolean;
  lastSeen: string;
  userId: string;
  status: DeviceStatus;
}

export interface AppUsage {
  id: string;
  appName: string;
  durationMinutes: number;
  timestamp: string;
  iconUrl?: string;
}

export interface NotificationRecord {
  id: string;
  deviceId: string;
  title: string;
  body: string;
  type: 'system' | 'alert' | 'message';
  createdAt: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
