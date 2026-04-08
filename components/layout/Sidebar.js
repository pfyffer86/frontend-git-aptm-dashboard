"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconLayoutDashboard,
  IconWallet,
  IconCoins,
  IconSettings
} from "@tabler/icons-react"

export default function Sidebar() {

  const path = usePathname()

  const menu = [
    {
      title: "Portfolio",
      items: [
        { label: "Overview", href: "/dashboard", icon: IconLayoutDashboard },
        { label: "Wallets", href: "/wallets", icon: IconWallet },
        { label: "Assets", href: "/assets", icon: IconCoins }
      ]
    },
    {
      title: "System",
      items: [
        { label: "Settings", href: "/settings", icon: IconSettings }
      ]
    }
  ]

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <svg width="160" height="28" viewBox="0 0 210 32" fill="none">
          <path d="M28.594 8.328 24.992 0 11.153 32h6.921l6.918-15.569 3.84 8.65h-7.3L24.992 32H38.83L28.594 8.328z" fill="#488BC3"/>
          <path d="M17.439 8.328 13.837 0 0 32h6.918l6.919-15.569 3.602-8.103z" fill="url(#g)"/>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="100" y2="100">
              <stop stopColor="#B58947"/>
              <stop offset="1" stopColor="#FFEDAB"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {menu.map(section => (
        <div key={section.title}>

          <div className="menu-section">
            {section.title}
          </div>

          {section.items.map(item => {
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={path === item.href ? "active" : ""}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}

        </div>
      ))}

    </div>
  )
}
