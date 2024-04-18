import DeviceInfo from 'react-native-device-info';

export enum EDeviceBrand {
    apple = 'APPLE',
    huawei = 'HUAWEI',
    others = 'OTHERS', // consider able support playstore
}

const getBrand = () => {
    const brand = DeviceInfo.getBrand().toUpperCase();
    if (brand == EDeviceBrand.apple) {
        return EDeviceBrand.apple;
    } else if (brand == EDeviceBrand.huawei) {
        return EDeviceBrand.huawei;
    } else {
        return EDeviceBrand.others;
    }
};

const getUniqueId = DeviceInfo.getUniqueIdSync();

const isTablet = DeviceInfo.isTablet();

export const DeviceInfoLib = {
    getBrand,
    getUniqueId,
    isTablet,
};
