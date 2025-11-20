'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/lib/api'
import { Navigation } from '@/components/Navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const data = await login(email, password)
      localStorage.setItem('roda_token', data.access_token)
      router.push('/portal')
    } catch (err) {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <main className="min-h-screen bg-dark-bg text-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-roda-green/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <Navigation />
      
      <div className="z-10 w-full max-w-md p-8">
        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 text-center">
            Admin <span className="text-roda-green">Login</span>
          </h1>
          <p className="text-gray-text text-center mb-8 text-sm">Acceso restringido al personal autorizado.</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Usuario</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-roda-green focus:ring-1 focus:ring-roda-green outline-none transition-colors"
                placeholder="admin@roda.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-roda-green focus:ring-1 focus:ring-roda-green outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-roda-green text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-colors uppercase tracking-wider text-sm mt-4 cursor-pointer"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
             <p className="text-xs text-gray-600">
                Demo Credenciales: <br/>
                User: <span className="text-gray-400">admin@roda.com</span> / Pass: <span className="text-gray-400">admin123</span>
             </p>
          </div>
        </div>
      </div>
    </main>
  )
}

