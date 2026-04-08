"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {

  const path = usePathname()

  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Assets", href: "/assets" },
    { label: "Settings", href: "/settings" }
  ]

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        Apertum
      </div>

      <div className="sidebar-nav">
        {items.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className={path === i.href ? "active" : ""}
          >
            {i.label}
          </Link>
        ))}
      </div>

    </div>
  )
}
