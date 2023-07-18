import React from 'react'

const UiDevelopment = React.lazy(() => import('./views/uidevelopment/UiDevelopment'))
const Charts = React.lazy(() => import('./views/charts/Charts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/ui-development', name: 'ui-development', element: UiDevelopment },
  { path: '/charts', name: 'Charts', element: Charts },
]

export default routes
