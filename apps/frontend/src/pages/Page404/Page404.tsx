import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export function Page404() {
  return (
    <Result
      status={'error'}
      title='Страница не найдена!'
      extra={
        <Link to='/'>
          <Button type='primary'>На главную</Button>
        </Link>
      }
    />
  )
}
