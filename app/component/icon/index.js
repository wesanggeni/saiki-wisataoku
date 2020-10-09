import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
	Image,
	ImageStyle
} from "react-native";
import {
	Icon,
	IconElement,
} from "@ui-kitten/components";

export const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

export const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

export const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export const LogoIcon = () => (
  <Image style={{width:73, height:30}}
    source={require('../../assets/logo.png')}
  />
);

//---------

export const searchIcon = () => (
  <Image 
    source={require('../../assets/images/search.png')}  
    style={{width: 10, height: 10, position: 'absolute', marginLeft:10}} 
  />
);

export const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

export const CloseIcon = (style) => (
  <Icon {...style} name='close-outline'/>
);

export const MinusIcon = (style) => (
  <Icon {...style} size={7} name='minus'/>
);

export const PlusIcon = (style) => (
  <Icon {...style} size={7} name='plus'/>
);

export const FilterIcon = () => (
  <Icon name='menu-outline'/>
);

export const CartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='shopping-cart-outline'/>
);

export const ArrowForward = (style) => (
  <Icon {...style} name='chevron-right-outline'/>
);

export const SettingIcon = (style) => (
  <Icon {...style} name='settings-outline'/>
);

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye'/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye-off'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person'/>
);

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='camera'/>
);

export const ChatIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='message-square-outline'/>
);
