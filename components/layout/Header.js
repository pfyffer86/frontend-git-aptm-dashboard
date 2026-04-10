"use client"

import { useState, useEffect, useRef } from "react"
import { supabase } from "../../lib/supabase"
import { IconUser } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Header() {

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  const router = useRouter()
  const menuRef = useRef(null)

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
    setOpen(false)
    router.push("/login")
  }

  // ===== OUTSIDE CLICK =====
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // ===== ESC CLOSE =====
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div className="header">

      <div className="header-spacer" />

      <div className="header-actions">

        <div
          className="user-menu"
          ref={menuRef}
        >
          <div
            className="user-button primary"
            onClick={() => setOpen(prev => !prev)}
          >
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
                  onClick={() => {
                    setOpen(false)
                    router.push("/login")
                  }}
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
