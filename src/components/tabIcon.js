import React from 'react';
import { Icon } from 'native-base';

const TabIcon = (props) => {
  return <Icon
    name={props.icon}
    style={{ color: props.focused ? '#2399E6' : '#fff' }}
  >
  </Icon>
};

export default TabIcon;