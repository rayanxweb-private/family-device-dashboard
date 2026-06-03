import { create } from 'zustand';
import { Device, AuthUser } from '@/types';

interface AppState {
  user: AuthUser | null;
  devices: Device[];
  isSidebarOpen: boolean;
  setUser: (user: AuthUser | null) => void;
  setDevices: (devices: Device[]) => void;
  toggleSidebar: () => void;
  updateDevice: (deviceId: string, updates: Partial<Device>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  devices: [],
  isSidebarOpen: true,
  setUser: (user) => set({ user }),
  setDevices: (devices) => set({ devices }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  updateDevice: (deviceId, updates) => set((state) => ({
    devices: state.devices.map(d => d.id === deviceId ? { ...d, ...updates } : d)
  })),
}));
