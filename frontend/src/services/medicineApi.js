const API = 'http://127.0.0.1:8000/api/medicines'
async function request(path = '', options) { const response = await fetch(`${API}${path}`, options); if (!response.ok) { const error = new Error('Request failed'); error.status = response.status; error.payload = await response.json().catch(() => ({})); throw error } return response.json() }
export const getMedicines = () => request()
export const getMedicine = (id) => request(`/${id}`)
export const createMedicine = (data) => request('', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
