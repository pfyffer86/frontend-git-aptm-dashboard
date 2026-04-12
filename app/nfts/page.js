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

    setLoading(false) // 🔥 WICHTIG

  }
}
