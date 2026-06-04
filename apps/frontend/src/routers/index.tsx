import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Page404, PageEmployee, PageWorkJournal, PageWorksType } from '../pages'
import { Layout404, LayoutHome } from '../layouts'
import { ROUTES } from '../constants'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout404 />}>
          <Route path='*' element={<Page404 />} />
        </Route>
        <Route element={<LayoutHome />}>
          <Route path='/' element={<PageWorkJournal />} />
          <Route
            path={ROUTES.REFERENCES.EMPLOYEES}
            element={<PageEmployee />}
          />
          <Route
            path={ROUTES.REFERENCES.WORKS_TYPE}
            element={<PageWorksType />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
