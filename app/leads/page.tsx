// app/leads/page.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'

interface Lead {
  _id: string
  name: string
  phone: string
  email: string
  message: string
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Fetch leads from API
  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch leads:', err)
        setLoading(false)
      })
  }, [])

  const filteredLeads = useMemo(() => {
    let filtered = leads

    // Search filter with safe checks
    if (searchTerm) {
      filtered = filtered.filter(lead => {
        const name = lead?.name || ''
        const phone = lead?.phone || ''
        const email = lead?.email || ''
        const term = searchTerm.toLowerCase()
        
        return name.toLowerCase().includes(term) ||
               phone.includes(term) ||
               email.toLowerCase().includes(term)
      })
    }

    // Date filter with safe check
    if (dateFilter !== 'all') {
      const now = new Date()
      const days = parseInt(dateFilter)
      const cutoff = new Date(now.setDate(now.getDate() - days))
      filtered = filtered.filter(lead => {
        if (!lead?.createdAt) return false
        return new Date(lead.createdAt) >= cutoff
      })
    }

    return filtered
  }, [leads, searchTerm, dateFilter])

  const copyToClipboard = async (text: string, field: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

const exportToCSV = () => {
  // Format data properly for Excel
  const headers = ['Date', 'Time', 'Name', 'Phone', 'Email', 'Message']
  
  const rows = filteredLeads.map(lead => {
    const date = lead?.createdAt ? new Date(lead.createdAt) : new Date()
    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      lead?.name || '',
      lead?.phone || '',  // Keep as string to preserve leading zeros
      lead?.email || '',
      lead?.message || ''
    ]
  })
  
  // Create CSV content with proper escaping
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => {
        const str = String(cell)
        // Quote if: contains comma, quote, newline, OR is empty (to preserve column structure)
        // Also quote phone numbers that start with 0 to prevent Excel from treating as number
        const needsQuotes = str.includes(',') || str.includes('"') || str.includes('\n') || str === '' || /^0\d+$/.test(str)
        const escaped = str.replace(/"/g, '""')
        return needsQuotes ? `"${escaped}"` : escaped
      }).join(',')
    )
  ].join('\n')
  
  // Add BOM for UTF-8 to handle special characters
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#0A192F] flex items-center justify-center pt-20">
        <div className="text-white text-xl">Loading leads...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#0A192F] pt-10 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-trailers font-bold mb-2">
            Leads Dashboard
          </h1>
          <p className="text-white/50 text-sm">
            Total leads: {filteredLeads.length} / {leads.length}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:border-neon-lime outline-none transition-colors placeholder-white/30"
            />
          </div>
          
          {/* Custom Date Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:border-neon-lime outline-none cursor-pointer flex items-center justify-between min-w-[160px]"
            >
              <span>
                {dateFilter === 'all' && 'All Time'}
                {dateFilter === '7' && 'Last 7 Days'}
                {dateFilter === '30' && 'Last 30 Days'}
                {dateFilter === '90' && 'Last 90 Days'}
              </span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 w-full bg-dark border border-white/10 rounded-lg overflow-hidden z-20">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: '7', label: 'Last 7 Days' },
                    { value: '30', label: 'Last 30 Days' },
                    { value: '90', label: 'Last 90 Days' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDateFilter(option.value)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                        dateFilter === option.value ? 'text-neon-lime bg-white/5' : 'text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full">
            <thead className="bg-neon-lime">
              <tr>
                <th className="px-6 py-4 text-left text-dark font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-dark font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-dark font-semibold">Phone</th>
                <th className="px-6 py-4 text-left text-dark font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-dark font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/60 text-sm whitespace-nowrap">
                    {lead?.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '-'}
                    <br />
                    <span className="text-xs text-white/30">
                      {lead?.createdAt ? new Date(lead.createdAt).toLocaleTimeString() : ''}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{lead?.name || '—'}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 group">
                      <span className="text-white/80">{lead?.phone || '—'}</span>
                      {lead?.phone && (
                        <button
                          onClick={() => copyToClipboard(lead.phone, `phone-${lead._id}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                        >
                          {copiedField === `phone-${lead._id}` ? (
                            <span className="text-green-400 text-xs">Copied!</span>
                          ) : (
                            <svg className="w-4 h-4 text-white/50 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {lead?.email ? (
                      <div className="flex items-center gap-2 group">
                        <span className="text-white/80 truncate max-w-[200px]">{lead.email}</span>
                        <button
                          onClick={() => copyToClipboard(lead.email, `email-${lead._id}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                        >
                          {copiedField === `email-${lead._id}` ? (
                            <span className="text-green-400 text-xs">Copied!</span>
                          ) : (
                            <svg className="w-4 h-4 text-white/50 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-white/30 text-sm">—</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="group relative">
                      <p className="text-white/60 text-sm max-w-md truncate cursor-pointer hover:text-white transition-colors"
                         onClick={() => lead?.message && copyToClipboard(lead.message, `msg-${lead._id}`)}>
                        {lead?.message || <span className="text-white/30">—</span>}
                      </p>
                      {lead?.message && (
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-sm p-2 rounded-lg whitespace-pre-wrap max-w-md z-10">
                          {lead.message}
                          <div className="text-xs text-neon-lime mt-1">Click to copy</div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/40 text-lg">
              {searchTerm || dateFilter !== 'all' ? (
                <>No leads match your filters. Try adjusting your search.</>
              ) : (
                <>No leads yet. Submit a test lead from your contact form!</>
              )}
            </div>
          </div>
        )}

        {/* Export Button */}
        {filteredLeads.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={exportToCSV}
              className="px-6 py-2 bg-neon-lime text-dark font-medium rounded-lg hover:bg-white transition-colors"
            >
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </div>
  )
}