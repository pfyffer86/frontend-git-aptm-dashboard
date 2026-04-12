"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import {
  IconPlus,
  IconTrash
} from "@tabler/icons-react"

export default function NFTsPage() {

  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)

  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const [form, setForm] = useState({
    display_id: "",
    token_id: "",
    tier: 1,
    lock_years: 1
  })

  // ===== LOAD =====
  async function loadNFTs() {

    try {

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      const res = await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/nfts",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      if (!res.ok) {
        throw new Error("API error: " + res.status)
      }

      const json = await res.json()

      setNfts(json || [])

    } catch (err) {

      console.error("NFT LOAD ERROR:", err)
      setNfts([])

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    loadNFTs()
  }, [])

  // ===== FILTER =====
  const membership = nfts.filter(n => n.type === "membership")

  // ===== ACTIONS =====

  function openAdd() {
    setForm({
      display_id: "",
      token_id: "",
      tier: 1,
      lock_years: 1
    })
    setModal("add")
  }

  function openDelete(n) {
    setSelected(n)
    setModal("delete")
  }

  async function handleAdd() {

    try {

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      await fetch(
        "https://apertum-dashboard-production.up.railway.app/api/nfts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            ...form,
            tier: Number(form.tier),
            lock_years: Number(form.lock_years),
            display_id: Number(form.display_id),
            type: "membership"
          })
        }
      )

      setModal(null)
      loadNFTs()

    } catch (err) {
      console.error("ADD NFT ERROR:", err)
    }
  }

  async function handleDelete() {

    try {

      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token

      await fetch(
        `https://apertum-dashboard-production.up.railway.app/api/nfts/${selected.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

      setModal(null)
      loadNFTs()

    } catch (err) {
      console.error("DELETE NFT ERROR:", err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>

      <h1>My NFTs</h1>

      {/* ADD CARDS */}
      <div className="wallet-grid mb-16">

        <div className="card add-wallet-card" onClick={openAdd}>
          <IconPlus size={28} />
          <div>Add Membership</div>
        </div>

        <div className="card add-wallet-card disabled">
          <div>TradeBot</div>
        </div>

        <div className="card add-wallet-card disabled">
          <div>MineBot</div>
        </div>

      </div>

      {/* MEMBERSHIP */}
      <div className="menu-section">Membership NFTs</div>

      <div className="wallet-grid">
        {membership.map(n => (
          <div key={n.id} className="card wallet-card">

            <div className="wallet-row">

              <div className="wallet-left">

                {/* HEXAGON */}
                <div className="nft-hex">
                  <span>S</span>
                </div>

                <div>
                  <div className="wallet-label">
                    #{n.display_id}
                  </div>

                  <div className="wallet-address">
                    Tier {n.tier} • {n.lock_years}y
                  </div>
                </div>

              </div>

              <div className="wallet-actions">

                <IconTrash
                  size={18}
                  className="action-icon delete"
                  onClick={() => openDelete(n)}
                />

              </div>

            </div>

          </div>
        ))}
      </div>

      {/* PLACEHOLDER */}
      <div className="menu-section mt-24">TradeBots</div>
      <div className="text-secondary">Coming soon</div>

      <div className="menu-section mt-24">MineBots</div>
      <div className="text-secondary">Coming soon</div>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">

            {/* ADD */}
            {modal === "add" && (
              <>
                <h3>Add Membership NFT</h3>

                <input
                  placeholder="Display ID"
                  value={form.display_id}
                  onChange={e => setForm({ ...form, display_id: e.target.value })}
                />

                <input
                  placeholder="Token ID"
                  value={form.token_id}
                  onChange={e => setForm({ ...form, token_id: e.target.value })}
                />

                <select
                  value={String(form.tier)}
                  onChange={e => setForm({ ...form, tier: Number(e.target.value) })}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={i+1}>
                      Tier {i+1}
                    </option>
                  ))}
                </select>

                <select
                  value={String(form.lock_years)}
                  onChange={e => setForm({ ...form, lock_years: Number(e.target.value) })}
                >
                  {[1,2,3,4].map(y => (
                    <option key={y} value={y}>
                      {y} Years
                    </option>
                  ))}
                </select>

                <div className="modal-actions">
                  <button
                    className="button-secondary"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="button-primary"
                    onClick={handleAdd}
                  >
                    Save
                  </button>
                </div>
              </>
            )}

            {/* DELETE */}
            {modal === "delete" && (
              <>
                <h3>Delete NFT</h3>

                <p className="text-secondary">
                  Are you sure you want to delete this NFT?
                </p>

                <div className="modal-actions">
                  <button
                    className="button-secondary"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="button-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
