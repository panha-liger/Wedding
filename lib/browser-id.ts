// Generate or retrieve unique browser ID
export function getBrowserId(): string {
  if (typeof window === 'undefined') return ''
  
  const STORAGE_KEY = 'wedding_browser_id'
  let browserId = localStorage.getItem(STORAGE_KEY)
  
  if (!browserId) {
    // Generate unique ID: timestamp + random string
    browserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem(STORAGE_KEY, browserId)
  }
  
  return browserId
}

