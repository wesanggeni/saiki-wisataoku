import React from "react";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import withBadge from './badge';

export const FeatherBadge = (props) => {
    const Icon = withBadge(props.count)(Feather);
    return <Icon {...props} />
}

export const FontAwesomeBadge = (props) => {
    const Icon = withBadge(props.count)(FontAwesome);
    return <Icon {...props} />
}

export const IoniconsBadge = (props) => {
    const Icon = withBadge(props.count)(Ionicons);
    return <Icon {...props} />
}

export const AntDesignBadge = (props) => {
    const Icon = withBadge(props.count)(AntDesign);
    return <Icon {...props} />
}

export const EntypoBadge = (props) => {
    const Icon = withBadge(props.count)(Entypo);
    return <Icon {...props} />
}