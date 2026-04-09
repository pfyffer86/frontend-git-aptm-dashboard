"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {

  const path = usePathname()

  return (
    <div className="sidebar">

      <div className="logo">
        Apertum
      </div>

      <div className="menu-section">Portfolio</div>

      <Link href="/dashboard" className={path === "/dashboard" ? "active" : ""}>
        Overview
      </Link>

      <Link href="/wallets" className={path === "/wallets" ? "active" : ""}>
        Wallets
      </Link>

      <Link href="/assets" className={path === "/assets" ? "active" : ""}>
        Assets
      </Link>

      <div className="menu-section">System</div>

      <Link href="/settings" className={path === "/settings" ? "active" : ""}>
        Settings
      </Link>

    </div>
  )
}
