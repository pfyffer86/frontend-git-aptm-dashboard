"use client"

export default function Header() {
  return (
    <div className="header">

      <button className="button-primary">
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
