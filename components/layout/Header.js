"use client"

export default function Header() {
  return (
    <div className="header">

      <button style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e6e8ec",
        background: "#fff",
        cursor: "pointer",
        marginRight: 12
      }}>
        Refresh
      </button>

      <div style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12
      }}>
        U
      </div>

    </div>
  )
}
