import {sfont} from '@libs/responsive.lib';
import {Colors} from '@styles/Colors';
import React from 'react';
import {Text, TextStyle, View} from 'react-native';

type CustomTextProps = {
  styles?: TextStyle;
  label: string;
  size: 'big' | 'medium' | 'small';
  numberOfLines?: number;
};

const CustomText = ({
  styles,
  label,
  size,
  numberOfLines,
}: CustomTextProps) => {
  let textStyles: TextStyle = {
    color: Colors.black,
    ...styles,
  };

  if (size == 'big') {
    textStyles = {...textStyles, fontSize: sfont(14), fontWeight: 'bold'};
  }

  if (size == 'medium') {
    textStyles = {...textStyles, fontSize: sfont(12), fontWeight: '500'};
  }

  if (size == 'small') {
    textStyles = {...textStyles, fontSize: sfont(10), fontWeight: '500'};
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <Text numberOfLines={numberOfLines} style={textStyles}>
        {label}
      </Text>
    </View>
  );
};
export default CustomText;
