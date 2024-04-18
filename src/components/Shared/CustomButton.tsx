import {sfont, sh, sw} from '@libs/responsive.lib';
import {Colors} from '@styles/Colors';
import React, {ReactNode} from 'react';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import CustomText from './CustomText';
import SizedBox from './SizedBox';

interface ButtonProps {
    type: 'primary' | 'secondary' | 'tertiary';
    size: 'big' | 'medium' | 'small';
    title: string;
    icon?: ReactNode;
    disabled?: boolean;
    onPress(): void;
}

const CustomButton = ({type, size, title, icon = undefined, disabled = false, onPress}: ButtonProps) => {
    let buttonStyle: ViewStyle = {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sw(5),
    };
    let textStyle: TextStyle = {
        fontWeight: 'bold',
    };
    if (type == 'primary') {
        buttonStyle = {...buttonStyle, backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.primary};
        textStyle = {...textStyle, color: Colors.black};
    }
    if (type == 'secondary') {
        buttonStyle = {
            ...buttonStyle,
            backgroundColor: Colors.black,
            borderWidth: 2,
            borderColor: Colors.primary,
        };
        textStyle = {...textStyle, color: Colors.primary};
    }
    if (type == 'tertiary') {
        textStyle = {
            color: Colors.primary,
            textDecorationLine: 'underline',
        };
    }
    if (size == 'big') {
        buttonStyle = {
            padding: sh(10),
            ...buttonStyle,
        };
        textStyle = {
            ...textStyle,
            fontSize: sfont(14),
        };
    }
    if (size == 'medium') {
        buttonStyle = {
            padding: sh(8),
            ...buttonStyle,
        };
        textStyle = {
            ...textStyle,
            fontSize: sfont(12),
        };
    }
    if (size == 'small') {
        buttonStyle = {
            ...buttonStyle,
            padding: sh(5),
        };
        textStyle = {
            ...textStyle,
            fontSize: sfont(10),
        };
    }

    return (
        <TouchableOpacity disabled={disabled} style={buttonStyle} onPress={() => onPress()}>
            {icon && (
                <>
                    {icon}
                    <SizedBox width={sw(10)} />
                </>
            )}
            <CustomText size={size} label={title} styles={textStyle} />
        </TouchableOpacity>
    );
};
export default CustomButton;
