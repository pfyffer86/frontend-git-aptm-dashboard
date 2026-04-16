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
    <svg width="360" height="120" viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="gGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>

    <filter id="softGlow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- APTM -->
  <text x="20" y="55"
        font-family="Arial"
        font-size="40"
        font-weight="900"
        letter-spacing="6"
        fill="url(#gGlow)">
    APTM
  </text>

  <!-- Pulse -->
  <polyline points="20,75 60,75 85,45 105,95 125,65 155,75 190,75"
            fill="none"
            stroke="url(#gGlow)"
            stroke-width="2.5"
            filter="url(#softGlow)"/>

  <!-- DASHBOARD (tighter) -->
  <text x="20" y="88"
        font-family="Arial"
        font-size="8.5"
        letter-spacing="2"
        fill="#d4af37">
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
