import React from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Image } from 'antd'

import styles from './style.module.css'

const CircleBar = ({ icon, total = 0, count = 0 }) => {
  const { currentTheme } = useThemeSwitcher()

  const fill = {
    dark: '#303030',
    light: '#fff'
  }[currentTheme]

  const stroke = {
    dark: '#424242',
    light: '#F0F2F5'
  }[currentTheme]

  const primaryColor = {
    dark: '#E76F00',
    light: '#AFD9FF'
    // light: '#17C9B2'
  }[currentTheme]
  
  const secundaryColor = {
    dark: '#A64B00',
    light: '#1890FF'
  }[currentTheme]

  const styleIcon = {
    dark: {
      filter: 'invert(1)'
    },
    light: {}
  }[currentTheme]

  const a = Math.PI * ((2 * count) / total - 0.5)
  const x = 46 + 46 * Math.cos(a - 0.12202691584261159)
  const y = 46 + 46 * Math.sin(a - 0.12202691584261159)

  let indicator = null

  if ((Math.PI * 2 * count) / total > Math.PI) {
    indicator = `M46,46 L${50.48828550544305},${0.2194878444809234}  A46,46 1 0,1 ${46},${92} A46,46 1 0,1 ${x},${y}  z`
  } else {
    indicator = `M46,46 L${50.48828550544305},${0.2194878444809234} A46,46 1 0,1 ${x},${y} z`
  }

  if (count > total) {
    indicator = `M46,46 L46,0 A46,46 1 0,1 ${46},${0} z`
    throw new Error('count cannot be greater than total')
  }

  return (
    <div className={styles.container}>
      <svg
        width="92"
        height="92"
        viewBox="0 0 93 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="46"
          cy="46"
          r="41"
          fill="transparent"
          strokeWidth="10"
          stroke={stroke}></circle>

        {count > 0 && <path d={indicator} fill="url(#paint0_linear)"></path>}
        <circle cx="46" cy="46" r="36" fill="transparent"></circle>

        <circle cx="46" cy="46" r="36" fill={fill}></circle>

        {count > 0 && (
          <circle
            cx={50.99096}
            cy={5.304911}
            r="5"
            fill="url(#paint0_linear)"></circle>
        )}

        {count > 0 && (
          <circle
            cx={46 + 41 * Math.cos(a - 0.12202691584261159)}
            cy={46 + 41 * Math.sin(a - 0.12202691584261159)}
            r="5"
            fill="url(#paint0_linear)"></circle>
        )}

        <defs>
          <linearGradient
            id="paint0_linear"
            x1="62.8953"
            y1="0.158936"
            x2="62.8953"
            y2="92"
            gradientUnits="userSpaceOnUse">
            <stop stopColor={primaryColor} />
            <stop offset={1} stopColor={secundaryColor} />
          </linearGradient>
        </defs>
      </svg>

      <Image
        className={styles.icon}
        preview={false}
        style={styleIcon}
        width={62}
        height={62}
        src={icon}
      />
    </div>
  )
}

export default CircleBar
