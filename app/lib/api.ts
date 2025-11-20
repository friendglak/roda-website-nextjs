// En Docker/Nginx, la API está en /api relativo al dominio actual.
// Si no estamos en navegador (SSR), usamos localhost interno si fuera necesario, 
// pero para cliente siempre /api es lo mejor.
const API_URL = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('roda_token') : null;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function login(username: string, password: string) { // username is email
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  });

  if (!res.ok) throw new Error('Credenciales inválidas');
  return res.json();
}

export async function fetchVehicles() {
  const res = await fetch(`${API_URL}/vehicles/`);
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}

export async function fetchAllCredits() {
  const res = await fetch(`${API_URL}/credits/`, {
    headers: { ...getAuthHeader() }
  });
  if (res.status === 401) throw new Error('Unauthorized');
  if (!res.ok) throw new Error('Failed to fetch credits');
  return res.json();
}

export async function createCreditApplication(data: any) {
  const res = await fetch(`${API_URL}/credits/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create application');
  }
  return res.json();
}

export async function createClient(data: any) {
    const res = await fetch(`${API_URL}/clients/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle 400 if email exists (we might want to just return the existing client in a real app logic or handle the error)
    if (!res.ok) {
        const error = await res.json();
        // If email exists, try to fetch the client
        if (res.status === 400 && error.detail === "Email already registered") {
            // This is a hacky way to get the client ID without a specific endpoint for "get by email" exposed yet without auth
            // In a real app, we'd have auth. For this test, let's assume we can just proceed or ask the user to "login" (mocked).
            // For now, let's just throw and let the UI handle "Email already registered"
            throw new Error(error.detail);
        }
        throw new Error(error.detail || 'Failed to create client');
    }
    return res.json();
}

export async function createPayment(creditId: number, amount: number) {
  const res = await fetch(`${API_URL}/payments/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ credit_id: creditId, amount: amount }),
  });
  
  if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create payment');
  }
  return res.json();
}
