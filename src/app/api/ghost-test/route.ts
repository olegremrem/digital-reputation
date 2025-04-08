import { NextResponse } from 'next/server'

export async function GET() {
  const ghostUrl = process.env.GHOST_API_URL || 'http://localhost:2368'
  const apiKey = process.env.GHOST_CONTENT_API_KEY || ''
  
  // Test different API endpoints to find the right one
  const apiVersions = [
    `${ghostUrl}/ghost/api/content`,     // Correct format per docs
    `${ghostUrl}/ghost/api/v5/content`,  // Standard v5 path
    `${ghostUrl}/ghost/api/v4/content`,  // Try v4
    `${ghostUrl}/ghost/api/v3/content`,  // Try v3
    `${ghostUrl}/ghost/api`,             // Try bare API
    `${ghostUrl}/api`,                   // Try alternate API path
  ]
  
  // Results from each attempt
  const results = []
  
  // Try each API endpoint
  for (const apiUrl of apiVersions) {
    try {
      const tagsUrl = new URL(`${apiUrl}/tags/`)
      tagsUrl.searchParams.append('key', apiKey)
      tagsUrl.searchParams.append('limit', '5')
      
      console.log('Testing Ghost API using URL:', tagsUrl.toString())
      
      const response = await fetch(tagsUrl.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        // Don't wait too long for each attempt
        signal: AbortSignal.timeout(5000)
      })
      
      results.push({
        url: apiUrl,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })
      
      if (response.ok) {
        const data = await response.json()
        
        return NextResponse.json({
          success: true,
          message: 'Successfully connected to Ghost API',
          workingApiUrl: apiUrl,
          allResults: results,
          data
        })
      }
    } catch (error) {
      console.log(`Failed testing ${apiUrl}:`, error instanceof Error ? error.message : String(error))
      results.push({
        url: apiUrl,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
  
  // If we reach here, none of the attempts worked
  return NextResponse.json({
    success: false,
    message: 'Could not connect to the Ghost API with any of the attempted URL patterns',
    results
  }, { status: 500 })
} 