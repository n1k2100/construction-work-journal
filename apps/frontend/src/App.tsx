import { App, ConfigProvider } from 'antd'
import localeRu from 'antd/locale/ru_RU'

import { Router } from './routers'

function AppComponent() {
  return (
    <>
      <ConfigProvider locale={localeRu}>
        <App className='h-screen overflow-hidden'>
          <Router />
        </App>
      </ConfigProvider>
    </>
  )
}

export default AppComponent
