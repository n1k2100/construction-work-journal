import { Layout, type LayoutProps } from 'antd'

import type { PropsWithChildren } from 'react'

export type LayoutBaseProps = PropsWithChildren<LayoutProps>

export function LayoutBase(props: LayoutBaseProps) {
  return (
    <Layout className='h-full' {...props}></Layout>
  )
}
