// app/api/contact/route.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

export async function POST(request) {
  console.log('📬 API hit')
  
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

    // 2. Parse request body
    const body = await request.json()
    console.log('📦 Body:', body)
    
    const { name, phone, email, message } = body
    
    // 3. Validate
  if (!name || !phone) {
  return Response.json(
    { error: 'Name and phone number are required' },
    { status: 400 }
  )
}

    // 4. Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...')
    client = new MongoClient(uri)
    await client.connect()
    console.log('✅ Connected to MongoDB')
    
    const db = client.db('yourease')
    const leads = db.collection('leads')
    
    // 5. Insert lead
    const result = await leads.insertOne({
      name,
  phone,
  email: email || '',
  message: message || '',
  createdAt: new Date(),
    })
    
    console.log('✅ Lead inserted:', result.insertedId)
    
    return Response.json(
      { success: true, id: result.insertedId },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('❌ API Error:', error.message)
    console.error('Stack:', error.stack)
    
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
    
  } finally {
    if (client) {
      await client.close()
      console.log('🔌 MongoDB connection closed')
    }
  }
}