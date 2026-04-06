"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

export default function AssetsPage() {

  const [data, setData] = useState(null)
  const [selectedWallet, setSelectedWallet] = useState(null)

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
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>
  if (error) return <div style={{ padding: 40 }}>Error: {error}</div>
  if (!data) return null

  const totalValue = data.totalValue || 0
  const wallets = data.wallets || []
  const tokens = data.tokens || []

  const sorted = [...tokens].sort((a, b) => b.value_usd - a.value_usd)

  const displayTokens = selectedWallet
    ? selectedWallet.tokens
    : sorted

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Assets</h1>

      <KPISection totalValue={totalValue} count={tokens.length} />

      <AllocationChart
        tokens={displayTokens}
        totalValue={totalValue}
      />

      <AssetsTable
        tokens={displayTokens}
        totalValue={totalValue}
      />

      <WalletBreakdown
        wallets={wallets}
        totalValue={totalValue}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
      />

    </div>
  )
}

/* ================= KPI ================= */

function KPISection({ totalValue, count }) {
  return (
    <div style={styles.kpiRow}>
      <Card>
        <div>Total Value</div>
        <div style={styles.kpiValue}>{formatUSD(totalValue)}</div>
      </Card>
      <Card>
        <div>Assets</div>
        <div style={styles.kpiValue}>{count}</div>
      </Card>
    </div>
  )
}

/* ================= CHART ================= */

function AllocationChart({ tokens, totalValue }) {

  const threshold = 3.5

  const prepared = tokens.map(t => {
    const value = t.value_usd || 0
    const allocation = totalValue > 0
      ? (value / totalValue) * 100
      : 0
    return { name: t.symbol, value, allocation }
  })

  let others = 0

  const filtered = prepared.filter(t => {
    if (t.allocation < threshold) {
      others += t.value
      return false
    }
    return true
  })

  if (others > 0) {
    filtered.push({ name: "Others", value: others })
  }

  return (
    <div style={styles.card}>
      <h3>Allocation</h3>

      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={filtered}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              label={({ percent }) =>
                percent > 0.04 ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {filtered.map((e, i) => (
                <Cell key={i} fill={getColor(i, e.name)} />
              ))}
            </Pie>
            <Tooltip formatter={v => formatUSD(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/* ================= TABLE ================= */

function AssetsTable({ tokens, totalValue }) {

  return (
    <div style={styles.card}>
      <h3>Assets</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Asset</th>
            <th style={styles.right}>Balance</th>
            <th style={styles.right}>Price</th>
            <th style={styles.right}>Value</th>
            <th style={styles.right}>Allocation</th>
          </tr>
        </thead>

        <tbody>
          {tokens.map((t, i) => {

            const allocation = totalValue > 0
              ? (t.value_usd / totalValue) * 100
              : 0

            const price =
              t.price || (t.amount ? t.value_usd / t.amount : 0)

            return (
              <tr key={t.symbol + i}>
                <td>{t.symbol}</td>
                <td style={styles.right}>{formatAmount(t.amount)}</td>
                <td style={styles.right}>{formatUSD(price)}</td>
                <td style={styles.right}>{formatUSD(t.value_usd)}</td>
                <td style={styles.right}>
                  {allocation.toFixed(1)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ================= WALLET ================= */

function WalletBreakdown({
  wallets,
  totalValue,
  selectedWallet,
  setSelectedWallet
}) {

  return (
    <div style={styles.card}>
      <h3>Wallets</h3>

      {wallets.map((w, i) => {

        const value = w.totalValue || 0

        const active = selectedWallet?.address === w.address

        return (
          <div
            key={w.address + i}
            style={{
              ...styles.walletRow,
              background: active ? "#1a1a1a" : "transparent",
              cursor: "pointer"
            }}
            onClick={() =>
              setSelectedWallet(active ? null : w)
            }
          >
            <div>
              <div>{w.label || "Wallet"}</div>
              <div style={styles.sub}>
                {shorten(w.address)}
              </div>
            </div>

            <div style={styles.right}>
              <div>{formatUSD(value)}</div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

/* ================= HELPERS ================= */

function formatUSD(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(v || 0)
}

function formatAmount(v) {
  if (!v) return "0"
  if (v < 1) return v.toFixed(6)
  return new Intl.NumberFormat("en-US").format(v)
}

function shorten(a) {
  return a?.slice(0, 6) + "..." + a?.slice(-4)
}

function getColor(i, name) {
  if (name === "Others") return "#333"
  const p = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#06b6d4"]
  return p[i % p.length]
}

/* ================= STYLES ================= */

const styles = {
  page: { padding: 40, color: "#fff" },
  kpiRow: { display: "flex", gap: 20 },
  kpiValue: { fontSize: 20 },
  card: { background: "#111", padding: 20, marginTop: 20 },
  table: { width: "100%" },
  right: { textAlign: "right" },
  walletRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10
  },
  sub: { fontSize: 12, opacity: 0.6 }
}
