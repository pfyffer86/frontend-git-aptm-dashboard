"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {

  const [data, setData] = useState(null)

  useEffect(() => {

    async function load() {

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      const res = await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/dashboard",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      const json = await res.json()
      console.log("API DATA:", json)

      setData(json)
    }

    load()

  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <h2>Total Value: ${data.totalValue.toFixed(2)}</h2>

      <h3>Wallets</h3>
      {data.wallets.map(w => (
        <div key={w.id}>
          {w.address} ({w.label || "no label"})
        </div>
      ))}

      <h2>Tokens</h2>

      {data.tokens.map(t => (
        <div key={t.symbol}>
          {t.symbol} — {t.amount} — ${t.value_usd.toFixed(2)}
        </div>
      ))}
    </div>
  )
}
