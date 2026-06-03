export type NotificationType = 'system' | 'alert' | 'message';
export type NotificationSeverity = 'low' | 'medium' | 'high' | 'critical';
export type NotificationStatus = 'read' | 'unread';

export interface NotificationRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  childName: string;
  type: NotificationType;
  severity: NotificationSeverity;
  message: string;
  createdAt: string;
  status: NotificationStatus;
}

export interface PairingSession {
  token: string;
  endpoint: string;
  timestamp: number;
  expiresAt: number;
  signature: string;
}

export interface DevicePairingRequest {
  id: string;
  deviceName: string;
  clientFingerprint: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
