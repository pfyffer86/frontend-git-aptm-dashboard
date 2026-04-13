"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { IconPigMoney, IconStack2, IconHexagonLetterS } from "@tabler/icons-react"

export default function StakingPage() {

  const [data, setData] = useState([])
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)

  async function load() {

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setLoading(false)
      return
    }

    try {

      const res = await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/staking",
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      )

      const json = await res.json()

      setData(Array.isArray(json.positions) ? json.positions : [])
      setPrice(json.aptm_price || 0)

    } catch (err) {

      console.error("STAKING FETCH ERROR:", err)
      setData([])
      setPrice(0)
    }

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <div>Loading...</div>

  /* ================= KPI ================= */

  const totalAPT = data.reduce((sum, n) => sum + (n.stake || 0), 0)
  const totalUSD = totalAPT * price

  return (
    <div>

      <h1>My Staking</h1>

      {/* ================= KPI ================= */}
      <div className="kpi-grid">

        {/* TOTAL VALUE */}
        <div className="card kpi-card">

          <div className="kpi-header">
            <div className="kpi-label">Total Value in Staking</div>
            <IconPigMoney size={18} className="kpi-icon" />
          </div>

          <div className="kpi-value">
            ${formatUSD(totalUSD)}
          </div>

          <div className="kpi-sub">
            Across all membership NFTs
          </div>

        </div>

        {/* TOTAL STAKED */}
        <div className="card kpi-card">

          <div className="kpi-header">
            <div className="kpi-label">Total Staked</div>
            <IconStack2 size={18} className="kpi-icon" />
          </div>

          <div className="kpi-value">
            {formatNumber(totalAPT)} APTM
          </div>

          <div className="kpi-sub">
            Across all membership NFTs
          </div>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="card">

        <div className="card-header">
          <h3 className="mb-16">Staking Breakdown</h3>
        </div>

        <table className="table">

          <thead>
            <tr>
              <th>ASSET</th>
              <th>ID</th>
              <th>TIER</th>
              <th>STAKED</th>
              <th>MAX STAKE</th>
              <th>UTILIZATION</th>
              <th>DURATION</th>
              <th>TIME PROGRESS</th>
            </tr>
          </thead>

          <tbody>

            {data.map(n => {

              const utilization = n.maxStake > 0
                ? n.stake / n.maxStake
                : 0

              return (
                <tr key={n.token_id}>

                  {/* ICON */}
                  <td>
                    <div className="asset-icon">
                      <IconHexagonLetterS size={16} />
                    </div>
                  </td>

                  {/* ID */}
                  <td>#{n.token_id}</td>

                  {/* TIER */}
                  <td>Tier {n.tier}</td>

                  {/* STAKED */}
                  <td>{formatNumber(n.stake)} APTM</td>

                  {/* MAX */}
                  <td>{formatNumber(n.maxStake)} APTM</td>

                  {/* UTILIZATION */}
                  <td>
                    <ProgressBar
                      value={utilization}
                      color={getUtilColor(utilization)}
                    />
                  </td>

                  {/* DURATION */}
                  <td>{n.lock_years}Y</td>

                  {/* TIME PROGRESS */}
                  <td>
                    <ProgressBar
                      value={n.progress}
                      color="var(--blue)"
                    />
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

/* ================= COMPONENTS ================= */

function ProgressBar({ value, color }) {

  const percent = Math.max(0, Math.min(100, value * 100))

  return (
    <div className="allocation">

      <div className="allocation-bar">
        <div
          className="allocation-fill"
          style={{
            width: `${percent}%`,
            background: color
          }}
        />
      </div>

      <div className="allocation-text">
        {percent.toFixed(1)}%
      </div>

    </div>
  )
}

/* ================= HELPERS ================= */

function formatNumber(v) {
  if (!v || isNaN(v)) return "0"

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(v)
}

function formatUSD(v) {
  if (!v || isNaN(v)) return "0"

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(v)
}

function getUtilColor(u) {
  if (u <= 0.25) return "#ef4444"
  if (u <= 0.5) return "#f97316"
  if (u <= 0.75) return "#eab308"
  return "#22c55e"
}
