export type AdminStats = {
  approvedSchools: number
  approvedOpportunities: number
  pendingSchools: number
  pendingOpportunities: number
}

export function getAdminStats(): AdminStats {
  if (typeof window === "undefined") {
    return { approvedSchools: 0, approvedOpportunities: 0, pendingSchools: 0, pendingOpportunities: 0 }
  }

  const approvedSchoolsRaw = localStorage.getItem("approvedSchools")
  const approvedOppsRaw = localStorage.getItem("volunteerOpportunities")
  const schoolSubmissionsRaw = localStorage.getItem("schoolSubmissions")
  const ngoSubmissionsRaw = localStorage.getItem("ngoSubmissions")

  let approvedSchools = 0
  let approvedOpportunities = 0
  let pendingSchools = 0
  let pendingOpportunities = 0

  try {
    const a = approvedSchoolsRaw ? JSON.parse(approvedSchoolsRaw) : []
    approvedSchools = a.filter((s: any) => s && s.approved).length
  } catch { /* noop */ }

  try {
    const a = approvedOppsRaw ? JSON.parse(approvedOppsRaw) : []
    approvedOpportunities = a.filter((o: any) => o && o.approved).length
  } catch { /* noop */ }

  try {
    const p = schoolSubmissionsRaw ? JSON.parse(schoolSubmissionsRaw) : []
    pendingSchools = Array.isArray(p) ? p.length : 0
  } catch { /* noop */ }

  try {
    const p = ngoSubmissionsRaw ? JSON.parse(ngoSubmissionsRaw) : []
    pendingOpportunities = Array.isArray(p) ? p.length : 0
  } catch { /* noop */ }

  return { approvedSchools, approvedOpportunities, pendingSchools, pendingOpportunities }
}

export function useAdminStats(pollMs: number = 5000): AdminStats {
  // Client-only hook; import in client components
  // Dynamic import or usage inside "use client" files only
  const { useEffect, useState } = require("react") as typeof import("react")
  const [stats, setStats] = useState<AdminStats>(getAdminStats())
  useEffect(() => {
    setStats(getAdminStats())
    const id = setInterval(() => setStats(getAdminStats()), pollMs)
    return () => clearInterval(id)
  }, [pollMs])
  return stats
}


