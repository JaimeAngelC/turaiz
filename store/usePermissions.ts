import { checkLocationPermission, requestLocationPermission } from "@/core/permissions/location";
import { create } from "zustand";
import { PermissionStatus } from '@/infrastructure/interfaces/location';


interface PermissionsState {
    locationStatus: PermissionStatus;
    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionsStore = create<PermissionsState>()((set) => ({
    locationStatus: PermissionStatus.CHECKING,

    requestLocationPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationStatus: status });
        return status;
    },
    checkLocationPermission: async () => {
        const status = await checkLocationPermission();
        set({ locationStatus: status });
        return status;

    }
}))