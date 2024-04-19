import React from 'react';
import {ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSkeletonAnimation} from './useSkeletonAnimation';

export interface ISkeletonProps extends IUseSkeletonValueProps {
  loaderStyle: ViewStyle;
  numberOfItems?: number;
  direction?: 'row' | 'column';
}

export interface IUseSkeletonValueProps {
  speed?: number;
  targetOpacityValue?: number;
}

const Skeleton: React.FC<ISkeletonProps> = ({
  loaderStyle = {},
  speed = 1500,
  targetOpacityValue = 0.2,
}) => {
  const animatedStyle = useSkeletonAnimation({speed, targetOpacityValue});

  return <Animated.View style={[{...loaderStyle}, animatedStyle]} />;
};
export default Skeleton;

export {useSkeletonAnimation};
