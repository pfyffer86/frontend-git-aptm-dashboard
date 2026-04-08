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

      <div style={{
        fontWeight: 600,
        fontSize: 18,
        marginBottom: 30
      }}>
        Apertum
      </div>

      {items.map(i => (
        <Link
          key={i.href}
          href={i.href}
          style={{
            display: "block",
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 6,
            background: path === i.href ? "#f1f3f5" : "transparent",
            textDecoration: "none",
            color: "#111"
          }}
        >
          {i.label}
        </Link>
      ))}

    </div>
  )
}
