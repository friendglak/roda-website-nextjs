const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchVehicles() {
  const res = await fetch(`${API_URL}/vehicles/`);
  if (!res.ok) throw new Error('Failed to fetch vehicles');
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

