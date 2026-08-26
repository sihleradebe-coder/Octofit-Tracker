const codespaceName = import.meta.env.VITE_CODESPACE_NAME

// Set VITE_CODESPACE_NAME in .env.local for a Codespaces backend URL.
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(component) {
  const response = await fetch(`${apiBaseUrl}/api/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component}`)
  return responseItems(await response.json())
}