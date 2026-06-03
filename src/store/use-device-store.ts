import { create } from 'zustand';
import { Device } from '@/types';

interface DeviceState {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  updateDeviceRealtime: (deviceId: string, data: Partial<Device>) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  setDevices: (devices) => set({ devices }),
  updateDeviceRealtime: (deviceId, data) => set((state) => ({
    devices: state.devices.map((d) => d.id === deviceId ? { ...d, ...data } : d)
  })),
}));
