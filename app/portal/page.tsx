'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditApplicationWithDetails } from '../types'
import { fetchAllCredits, createPayment } from '../lib/api'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function PortalPage() {
  const [credits, setCredits] = useState<CreditApplicationWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paymentLoading, setPaymentLoading] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const loadCredits = () => {
    fetchAllCredits()
      .then(setCredits)
      .catch((err) => {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('roda_token')
          router.push('/portal/login')
        } else {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const token = localStorage.getItem('roda_token')
    if (!token) {
      router.push('/portal/login')
      return
    }
    loadCredits()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('roda_token')
    router.push('/portal/login')
  }

  const handlePayment = async (creditId: number, monthlyPayment: number) => {
    if (!confirm(`¿Registrar pago de cuota de $${Math.round(monthlyPayment).toLocaleString()}?`)) return

    setPaymentLoading(creditId)
    try {
      await createPayment(creditId, monthlyPayment)
      loadCredits()
      alert('Pago registrado correctamente')
    } catch (err: any) {
      alert('Error al registrar pago: ' + err.message)
    } finally {
      setPaymentLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-dark-bg text-white font-sans selection:bg-roda-green selection:text-black">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onOpenModal={() => router.push('/portal/login')}
      />

      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Portal <span className="text-roda-green">Admin</span>
            </h1>
            <p className="text-gray-text text-lg max-w-xl">
              Gestión de solicitudes de crédito, clientes y pagos.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-mono cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <div className="glass-panel px-6 py-3 rounded-full">
              <span className="text-sm text-gray-400 uppercase tracking-wider font-mono">Total Solicitudes</span>
              <div className="text-2xl font-bold text-white">{credits.length}</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-roda-green"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center">
            {error}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400">ID</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400">Cliente</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400">Vehículo</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400 w-1/4">Progreso de Pagos</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400 text-right">Estado</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-gray-400 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {credits.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        No hay solicitudes registradas aún.
                      </td>
                    </tr>
                  ) : (
                    credits.map((credit) => {
                      const totalDebt = credit.total_debt || (credit.monthly_payment * credit.term_months);
                      const totalPaid = credit.total_paid || 0;
                      const progress = Math.min(100, (totalPaid / totalDebt) * 100);

                      return (
                        <tr key={credit.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4 font-mono text-sm text-gray-500">#{credit.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-white">{credit.client?.full_name || 'N/A'}</div>
                            <div className="text-xs text-gray-500">{credit.client?.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium text-white">{credit.vehicle?.name || 'Vehículo desconocido'}</div>
                                <div className="text-xs text-gray-500">{credit.vehicle?.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-400">Pagado: ${Math.round(totalPaid).toLocaleString()}</span>
                              <span className="text-white">${Math.round(totalDebt).toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-roda-green h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}% completado</div>
                          </td>
                          <td className="p-4 text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${credit.status === 'paid' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                credit.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                  credit.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                              {credit.status === 'pending' ? 'Pendiente' :
                                credit.status === 'approved' ? 'Aprobado' :
                                  credit.status === 'rejected' ? 'Rechazado' :
                                    credit.status === 'paid' ? 'Pagado' : credit.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {credit.status !== 'paid' && credit.status !== 'rejected' && (
                              <button
                                onClick={() => handlePayment(credit.id, credit.monthly_payment)}
                                disabled={paymentLoading === credit.id}
                                className="text-xs bg-white/10 hover:bg-roda-green hover:text-black text-white px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-50"
                              >
                                {paymentLoading === credit.id ? '...' : 'Pagar Cuota'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
