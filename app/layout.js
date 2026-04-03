import "./globals.css"

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>

        <div style={{ display: "flex", height: "100vh" }}>

          {/* SIDEBAR */}
          <div style={{
            width: 220,
            background: "#0d0d0d",
            color: "#fff",
            padding: 20
          }}>
            <h2>Apertum</h2>

            <div style={{ marginTop: 30 }}>
              <a href="/dashboard" style={link}>Dashboard</a><br/>
              <a href="/assets" style={link}>Assets</a><br/>
              <a href="/settings" style={link}>Settings</a>
            </div>
          </div>

          {/* MAIN */}
          <div style={{
            flex: 1,
            background: "#111",
            color: "#fff",
            padding: 20
          }}>
            {children}
          </div>

        </div>

      </body>
    </html>
  )
}

const link = {
  color: "#aaa",
  textDecoration: "none",
  display: "block",
  marginBottom: 10
}
