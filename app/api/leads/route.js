// app/api/leads/route.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

export async function GET() {
  console.log('📬 Fetching leads API hit')
  
  let client
  
  try {
    // 1. Check if URI exists
    if (!uri) {
      console.error('❌ MONGODB_URI is missing in .env.local')
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // 2. Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...')
    client = new MongoClient(uri)
    await client.connect()
    console.log('✅ Connected to MongoDB')
    
    const db = client.db('yourease')
    const leads = db.collection('leads')
    
    // 3. Fetch all leads, sorted by newest first
    const allLeads = await leads
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    console.log(`✅ Found ${allLeads.length} leads`)
    
    // 4. Convert ObjectId to string for JSON response
    const formattedLeads = allLeads.map(lead => ({
      ...lead,
      _id: lead._id.toString()
    }))
    
    return Response.json(formattedLeads, { status: 200 })
    
  } catch (error) {
    console.error('❌ API Error:', error.message)
    
    return Response.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
    
  } finally {
    if (client) {
      await client.close()
      console.log('🔌 MongoDB connection closed')
    }
  }
}