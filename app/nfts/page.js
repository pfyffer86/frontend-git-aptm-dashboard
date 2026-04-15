"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconHexagonLetterS
} from "@tabler/icons-react"

export default function NFTsPage() {

  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      const res = await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/nft-staking",
        {
          headers: { Authorization: "Bearer " + token }
        }
      )

      if (!res.ok) throw new Error("API error: " + res.status)

      const json = await res.json()
      setNfts(json)

    } catch (err) {
      console.error("NFT ERROR:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>

      <h1>My NFTs</h1>

      {/* ADD CARDS */}
      <div className="wallet-grid mb-16">

        <div className="add-wallet-card">
          <IconPlus size={20} />
          <div>Add Staking NFT</div>
        </div>

        <div className="add-wallet-card">
          <IconPlus size={20} />
          <div>Add TradeBot NFT</div>
        </div>

        <div className="add-wallet-card">
          <IconPlus size={20} />
          <div>Add MineBot NFT</div>
        </div>

      </div>

      {/* TABLE */}
      <div className="card">
        <h3 className="mb-16">NFT Overview</h3>

        <table className="table">
          <thead>
            <tr>
              <th>NFT</th>
              <th>Label</th>
              <th>Token ID</th>
              <th>Tier</th>
              <th>Lock</th>
              <th>Settings</th>
            </tr>
          </thead>

          <tbody>
            {nfts.map(n => (
              <tr key={n.id}>

                {/* NFT TYPE */}
                <td>
                  <div className="token">
                    <div className="nft-hex">
                      <IconHexagonLetterS size={14} />
                    </div>
                    <span>Staking</span>
                  </div>
                </td>

                {/* LABEL */}
                <td>
                  {n.label || "-"}
                </td>

                {/* TOKEN */}
                <td>#{n.token_id}</td>

                {/* TIER */}
                <td>Tier {n.tier}</td>

                {/* LOCK */}
                <td>{n.lock_years} Years</td>

                {/* ACTIONS */}
                <td>
                  <div style={{ display: "flex", gap: 10 }}>
                    <IconEdit size={16} className="action-icon" />
                    <IconTrash size={16} className="action-icon delete" />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
