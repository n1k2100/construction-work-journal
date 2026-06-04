import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

import { LayoutBase } from '../LayoutBase/LayoutBase'

export function Layout404() {
  return (
    <LayoutBase>
      <Flex justify='center' align='center' className='h-full'>
        <Outlet />
      </Flex>
    </LayoutBase>
  )
}
