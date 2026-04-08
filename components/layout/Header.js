"use client"

import { useState } from "react"

export default function Header() {

  const [open, setOpen] = useState(false)

  return (
    <div className="header">

      <div />

      <div className="header-right">

        <button className="button">
          Refresh
        </button>

        <div className="user" onClick={() => setOpen(!open)}>
          U
        </div>

        {open && (
          <div className="dropdown">

            <div className="dropdown-label">
              Logged in as
            </div>

            <div className="dropdown-email">
              user@email.com
            </div>

            <div className="dropdown-divider" />

            <div className="dropdown-item">
              Logout
            </div>

          </div>
        )}

      </div>

    </div>
  )
}
