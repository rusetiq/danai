import { CommunityHub } from "@/components/community-hub"
import { Navigation } from "@/components/navigation"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <CommunityHub />
      </div>
    </main>
  )
}
