import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Liquid Web',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'UI Developement',
        to: '/ui-development',
      },
      {
        component: CNavItem,
        name: 'Triage/Support',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Salseforce',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Data Engineering',
        to: '/',
      },
    ],
  },
]

export default _nav
