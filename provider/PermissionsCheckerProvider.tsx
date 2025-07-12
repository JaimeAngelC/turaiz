import { AppState } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'

import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { router } from 'expo-router';
import { usePermissionsStore } from '../store/usePermissions';


const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
    const { locationStatus, checkLocationPermission, requestLocationPermission } = usePermissionsStore();


    useEffect(() => {
        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/');
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            //router.replace('/permissions');
            requestLocationPermission();
        }
    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    useEffect(() => {
        const subcription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        });
        return () => {
            subcription.remove();
        }
    }, []);


    return <>{children}</>
}

export default PermissionsCheckerProvider