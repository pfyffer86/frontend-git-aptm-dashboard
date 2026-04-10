"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { IconUser } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Header() {

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  const router = useRouter()

  // ===== LOAD USER =====
  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { data } = await supabase.auth.getUser()
    setUser(data?.user || null)
  }

  // ===== LOGOUT =====
  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  return (
    <div className="header">

      {/* RIGHT SIDE */}
      <div className="header-actions">

        <div
          className="user-menu"
          onClick={() => setOpen(!open)}
        >
          <div className="user-button primary">
            <IconUser size={18} />
          </div>

          {open && (
            <div className="user-dropdown">

              {user ? (
                <>
                  <div className="user-email">
                    Logged in:<br />
                    <span>{user.email}</span>
                  </div>

                  <button
                    className="dropdown-btn logout"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="dropdown-btn"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}
