import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.module.css'

const ModalMobile = ({
  children,
  show,
}) => (
  <div
    className={classNames(styles.bgModal, {
      [styles.show]: show,
    })}
  >
    <div
      className={classNames(styles.modal, {
        [styles.show]: show,
      })}
    >
      {children}
    </div>
   </div>
)

ModalMobile.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
}

export default ModalMobile