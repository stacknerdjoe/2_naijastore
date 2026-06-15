'use client'

import { ReactNode } from "react"
import ReactDom from 'react-dom'

interface PortalProps {
  handleClosePortal: () => void
  children: ReactNode
}

export default function Portal({ handleClosePortal, children }: PortalProps) {
  return ReactDom.createPortal(
    <div className='portal-container'>
      <div onClick={handleClosePortal} className='portal-underlay' />
      {children}
    </div>,
    document.getElementById('portal')!
  )
}
