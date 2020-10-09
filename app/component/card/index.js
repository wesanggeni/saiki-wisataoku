import React from 'react';
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(8,25,43,0.1)';

export const ImageOverlay = (props?: ImageOverlayProps): React.ReactElement<ImageBackgroundProps> => {

  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      style={imageBackgroundStyle}>
      <View style={[
        StyleSheet.absoluteFill,
        { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
      ]}/>
      {children}
    </ImageBackground>
  );
};
