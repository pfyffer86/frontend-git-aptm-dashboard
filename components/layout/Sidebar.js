"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconLayoutDashboard,
  IconChartLine,
  IconCoins,
  IconStack2,
  IconRobot,
  IconShovel,
  IconWallet,
  IconHexagonLetterN,
  IconSettings
} from "@tabler/icons-react"

export default function Sidebar() {

  const path = usePathname()

  const isActive = (href) => path === href

  return (
    <div className="sidebar">

      {/* LOGO */}
     <div className="logo">
    <svg width="460" height="140" viewBox="0 0 460 140" xmlns="http://www.w3.org/2000/svg">

  <rect width="460" height="140" rx="18" fill="#05070F"/>

  <defs>
    <linearGradient id="gradMain" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F5FF"/>
      <stop offset="100%" stop-color="#7A5CFF"/>
    </linearGradient>
  </defs>

  <!-- Accent Bar -->
  <rect x="0" y="0" width="460" height="6" fill="url(#gradMain)"/>

  <!-- Main Text -->
  <text x="40" y="80"
        font-family="Arial, Helvetica, sans-serif"
        font-size="64"
        font-weight="900"
        letter-spacing="8"
        fill="url(#gradMain)">
    APTM
  </text>

  <!-- Sub Label -->
  <text x="44" y="115"
        font-family="Arial, Helvetica, sans-serif"
        font-size="18"
        letter-spacing="6"
        fill="#94A3B8">
    DASHBOARD
  </text>

</svg>
      </div>

      {/* OVERVIEW */}
      <div className="menu-section">Overview</div>

      <Link href="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
        <IconLayoutDashboard size={18} />
        <span>Dashboard</span>
      </Link>

      <Link href="/rates" className={isActive("/rates") ? "active" : ""}>
        <IconChartLine size={18} />
        <span>Rates</span>
      </Link>

      {/* PORTFOLIO */}
      <div className="menu-section">Portfolio</div>

      <Link href="/wallets" className={isActive("/wallets") ? "active" : ""}>
        <IconWallet size={18} />
        <span>Wallets</span>
      </Link>

      <Link href="/assets" className={isActive("/assets") ? "active" : ""}>
        <IconCoins size={18} />
        <span>Assets</span>
      </Link>

      <Link href="/staking" className={isActive("/staking") ? "active" : ""}>
        <IconStack2 size={18} />
        <span>Staking</span>
      </Link>

      <Link href="/trading" className={isActive("/trading") ? "active" : ""}>
        <IconRobot size={18} />
        <span>Trading</span>
      </Link>

      <Link href="/mining" className={isActive("/mining") ? "active" : ""}>
        <IconShovel size={18} />
        <span>Mining</span>
      </Link>

      {/* MANAGEMENT */}
      <div className="menu-section">Management</div>

      <Link href="/wallets" className={isActive("/wallets") ? "active" : ""}>
        <IconWallet size={18} />
        <span>Wallets</span>
      </Link>

      <Link href="/nfts" className={isActive("/nfts") ? "active" : ""}>
        <IconHexagonLetterN size={18} />
        <span>NFTs</span>
      </Link>

      <Link href="/settings" className={isActive("/settings") ? "active" : ""}>
        <IconSettings size={18} />
        <span>Settings</span>
      </Link>

    </div>
  )
}
