import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Form } from 'antd'

import Add from '../../../Containers/Customer/Add'
import { buildAddCustomer } from '../../../utils/Specs/Customer'

export default {
  title: 'Pages/Customer',
  component: Add
}

const Template = (args) => {
  const [expand, setExpand] = useState(false)
  const [form] = Form.useForm()

  const handleClickExpand = () => setExpand(!expand)

  const handleSubmit = (formData) => {
    action('Submit form')(buildAddCustomer(expand)(formData))
  }

  return (
    <Add
      {...args}
      expand={expand}
      form={form}
      handleClickExpand={handleClickExpand}
      handleSubmit={handleSubmit}
    />
  )
}

export const ModalAdd = Template.bind({})

ModalAdd.args = {
  visible: true
}
