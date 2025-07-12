
import { getCurrentLocation, watchCurrentPosition } from "@/core/location";
import { LatLng } from "@/infrastructure/interfaces/LatLng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnownLocation: LatLng | null;
    userLocationList: LatLng[];
    watchSubscriptionID: LocationSubscription | null;

    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSubscriptionID: null,
    getLocation: async () => {
        const location = await getCurrentLocation()
        set({ lastKnownLocation: location })
        return location
    },

    watchLocation: async () => {
        const oldSubscription = get().watchSubscriptionID;
        if (oldSubscription !== null) {
            get().clearWatchLocation()
        }
        const watchSubscription = await watchCurrentPosition(
            (latLng) => {
                set({
                    lastKnownLocation: latLng,
                    userLocationList: [...get().userLocationList, latLng]
                })
            }
        )
        set({ watchSubscriptionID: watchSubscription })
    },

    clearWatchLocation: () => {
        const subcription = get().watchSubscriptionID;
        if (subcription !== null) {
            subcription.remove();
        }
    },

}))