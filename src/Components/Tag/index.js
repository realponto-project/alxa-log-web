import React from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'

import styles from './style.module.css'

const Tag = ({ color, children, disabled = false, onClick }) => {
  const { currentTheme } = useThemeSwitcher()

  const style = {
    dark: {
      color,
      background: color + '25',
      borderColor: color,
      boxShadow: '0 0 5px ' + color,

      // color: `${color}${disabled ? '55' : ''}`,
      // borderColor: `${color}${disabled ? '55' : ''}`,
      // background: `${color}${disabled ? '11' : '25'}`,
      // boxShadow: `${disabled ? '': `0 0 5px ${color}`}`
    },
    light: {
      color: '#fff',
      background: color,
      borderColor: color + '55'
    }
  }[currentTheme]

  return (
    <span onClick={onClick} disabled={disabled} id={styles['span-tag']} style={style}>
      {children}
    </span>
  )
}

export default Tag
