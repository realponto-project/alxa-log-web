import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import styles from "./style.module.css";

const Tag = ({ color, children }) => {
  const { currentTheme } = useThemeSwitcher();

  const style = {
    dark: {
      color,
      background: color + '25',
      borderColor: color, 
      boxShadow: '0 0 3px ' + color
    },
    light: {
      color: '#fff',
      background: color,
      borderColor: color + '55'
    }
  }[currentTheme]

  return (
    <span id={styles['span-tag']} style={style} >
      {children}
    </span>
  );
};

export default Tag;
