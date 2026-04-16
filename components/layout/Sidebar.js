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
     <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="gPulsePrimaryV6" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>

    <filter id="glowPulseV6">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Pulse -->
  <polyline points="6,40 22,40 30,18 38,58 46,32 60,40 74,40"
            fill="none"
            stroke="url(#gPulsePrimaryV6)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#glowPulseV6)"/>

  <!-- APTM -->
  <text x="6" y="52"
        font-family="Arial, Helvetica, sans-serif"
        font-size="8"
        font-weight="600"
        letter-spacing="1"
        fill="url(#gPulsePrimaryV6)">
    APTM
  </text>

  <!-- DASHBOARD (ultra micro) -->
  <text x="6" y="57"
        font-family="Arial, Helvetica, sans-serif"
        font-size="3.2"
        letter-spacing="0.6"
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
