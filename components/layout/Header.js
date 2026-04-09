"use client"

import { IconRefresh, IconUser } from "@tabler/icons-react"

export default function Header() {

  return (
    <div className="header">

      {/* LEFT */}
      <div className="header-left">
        <h2 className="header-title">Assets</h2>
      </div>

      {/* RIGHT */}
      <div className="header-right">

        <button className="button-primary header-btn">
          <IconRefresh size={16} />
          Refresh
        </button>

        <div className="user-button">
          <IconUser size={16} />
        </div>

      </div>

    </div>
  )
}
