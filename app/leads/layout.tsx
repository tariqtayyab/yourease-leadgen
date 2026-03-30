// app/leads/layout.tsx

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#0A192F]">
      {children}
    </div>
  )
}