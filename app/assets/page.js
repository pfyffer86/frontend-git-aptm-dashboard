"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import {
  IconWallet,
  IconCoins,
  IconReportMoney
} from "@tabler/icons-react"

/* ICON */

function getTokenIcon(cmc_id) {
  if (!cmc_id) return null
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${cmc_id}.png`
}

export default function AssetsPage() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      const res = await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/dashboard",
        {
          headers: { Authorization: "Bearer " + token }
        }
      )

      if (!res.ok) throw new Error("API error: " + res.status)

      const json = await res.json()
      setData(json)

    } catch (err) {
      console.error("ASSETS ERROR:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return null

  const totalValue = data.totalValue || 0
  const tokens = data.tokens || []
  const wallets = data.wallets || []

  const sorted = [...tokens].sort((a, b) => b.value_usd - a.value_usd)

  /* 🔥 UNIQUE TOKEN COUNT */
  const uniqueTokens = new Set(tokens.map(t => t.symbol))

  return (
    <div>

      <h1>My Tokens</h1>

      {/* KPI */}
      <div className="kpi-grid">

        {/* KPI 1 */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <div className="kpi-label">Total Token Value</div>
            <IconReportMoney size={18} className="kpi-icon" />
          </div>

          <div className="kpi-value">{formatUSD(totalValue)}</div>
          <div className="kpi-sub">Across all Wallets</div>
        </div>

        {/* KPI 2 (TOKENS FIRST) */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <div className="kpi-label">Total Tracked Tokens</div>
            <IconCoins size={18} className="kpi-icon" />
          </div>

          <div className="kpi-value">{uniqueTokens.size}</div>
          <div className="kpi-sub">Across all Wallets</div>
        </div>

        {/* KPI 3 */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <div className="kpi-label">Total Tracked Wallets</div>
            <IconWallet size={18} className="kpi-icon" />
          </div>

          <div className="kpi-value">{wallets.length}</div>
          <div className="kpi-sub">Across Portfolio</div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card">
        <h3 className="mb-16">Tokens Breakdown</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Value</th>
              <th>Allocation</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map(t => {

              const allocation = totalValue > 0
                ? (t.value_usd / totalValue) * 100
                : 0

              const icon = getTokenIcon(t.cmc_id)

              return (
                <tr key={t.symbol}>
                  <td>
                    <div className="token">
                      <div className="token-icon">
                        {icon
                          ? <img src={icon} />
                          : <div className="token-fallback">{t.symbol[0]}</div>}
                      </div>
                      <span>{t.symbol}</span>
                    </div>
                  </td>

                  <td>{formatAmount(t.amount)}</td>
                  <td>{formatPrice(t.price)}</td>
                  <td>{formatUSD(t.value_usd)}</td>

                  <td>
                    <div className="allocation">
                      <div className="allocation-bar">
                        <div
                          className="allocation-fill"
                          style={{ width: `${allocation}%` }}
                        />
                      </div>
                      <div className="allocation-text">
                        {allocation.toFixed(1)}%
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

/* FORMAT */

function formatUSD(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(v || 0)
}

function formatPrice(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(v || 0)
}

function formatAmount(v) {
  if (!v) return "0"
  if (v < 0.0001) return v.toFixed(8)
  if (v < 1) return v.toFixed(6)

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4
  }).format(v)
}
