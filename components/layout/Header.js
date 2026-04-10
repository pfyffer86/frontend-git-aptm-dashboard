"use client"

import { usePathname } from "next/navigation"
import { IconRefresh, IconUser } from "@tabler/icons-react"

export default function Header() {

  const pathname = usePathname()

  function getTitle() {
    if (pathname.startsWith("/assets")) return "Assets"
    if (pathname.startsWith("/wallets")) return "Wallets"
    if (pathname.startsWith("/settings")) return "Settings"
    if (pathname.startsWith("/rates")) return "Rates"
    return "Dashboard"
  }

  return (
    <div className="header">

     <div className="header">
     <div />

  <div className="header-right">
    ...
  </div>

</div>

      <div className="header-right">

        <button className="button-primary header-refresh">
          <IconRefresh size={16} />
          Refresh
        </button>

        <div className="user-button">
          <IconUser size={18} />
        </div>

      </div>

    </div>
  )
}
