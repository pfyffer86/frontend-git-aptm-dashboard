"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  /* ================= SESSION CHECK ================= */

  useEffect(() => {

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        setError("Invalid or expired reset link")
      }
    }

    checkSession()

  }, [])

  /* ================= UPDATE PASSWORD ================= */

  async function handleUpdate(e) {
    e.preventDefault()

    if (!password) return

    setLoading(true)
    setError("")
    setMessage("")

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage("Password updated successfully")

    setTimeout(() => {
      router.push("/login")
    }, 1500)
  }

  /* ================= UI ================= */

  return (
    <div className="login-page">

      <div className="card login-card">

        <div className="login-logo">
          APERTUM DASHBOARD
        </div>

        <h1 className="login-title">Set New Password</h1>

        <form className="login-form" onSubmit={handleUpdate}>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <div className="login-error">{error}</div>}
          {message && <div className="login-message">{message}</div>}

          <button
            className="button-primary login-button"
            disabled={loading || !password}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  )
}
