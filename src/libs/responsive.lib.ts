import {PixelRatio} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {DeviceInfoLib} from './device.info.lib';

const sh = (numberInFigma: number) => {
    if (DeviceInfoLib.isTablet) {
        return hp((numberInFigma * 35) / 320);
    } else {
        return hp((numberInFigma * 100) / 640);
    }
};

const sw = (numberInFigma: number) => {
    if (DeviceInfoLib.isTablet) {
        return wp((numberInFigma * 20) / 180);
    } else {
        return wp((numberInFigma * 100) / 360);
    }
};

const sfont = (numberInFigma: number) => {
    if (DeviceInfoLib.isTablet) {
        return RFValue(numberInFigma, 1000) / PixelRatio.getFontScale();
    } else {
        return RFValue(numberInFigma, 640) / PixelRatio.getFontScale();
    }
};

export {sh, sw, sfont};
