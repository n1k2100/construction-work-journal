import { Flex, Layout, Menu, type MenuProps } from 'antd'
import { LayoutBase } from '../LayoutBase/LayoutBase'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  LayoutOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

import { ROUTES } from '../../constants'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: ROUTES.JOURNAL,
    icon: <LayoutOutlined />,
    label: 'Журнал работ',
  },
  {
    key: ROUTES.REFERENCES.LITERAL,
    type: 'submenu',
    icon: <BookOutlined />,
    label: 'Справочники',
    children: [
      {
        key: ROUTES.REFERENCES.WORKS_TYPE,
        icon: <ToolOutlined />,
        label: 'Виды работ',
      },
      {
        key: ROUTES.REFERENCES.EMPLOYEES,
        icon: <UserOutlined />,
        label: 'Сотрудники',
      },
    ],
  },
]

export function LayoutHome() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const defaultOpenKey = '/' + currentPath.split('/')[1]

  return (
    <LayoutBase>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={[currentPath]}
          defaultOpenKeys={[defaultOpenKey]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content>
          <Flex justify='center' align='center' className='h-full'>
            <Outlet />
          </Flex>
        </Layout.Content>
      </Layout>
    </LayoutBase>
  )
}
