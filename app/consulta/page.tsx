'use client'

import { useState } from 'react'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { fetchClientCredits, createPayment } from '../../app/lib/api'
import { CreditApplicationWithDetails } from '../../app/types'
import Link from 'next/link'

export default function ConsultaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [credits, setCredits] = useState<CreditApplicationWithDetails[]>([])
  const [searched, setSearched] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState<number | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCredits([])
    setSearched(false)

    try {
      const data = await fetchClientCredits(email)
      setCredits(data)
      setSearched(true)
    } catch (err: any) {
      setError(err.message || "Error al buscar")
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (creditId: number, monthlyPayment: number) => {
    if (!confirm(`¿Pagar cuota de ${formatMoney(monthlyPayment)}?`)) return

    setPaymentLoading(creditId)
    try {
      await createPayment(creditId, monthlyPayment)
      // Reload credits to update progress
      const data = await fetchClientCredits(email)
      setCredits(data)
      alert('¡Pago exitoso! Se ha actualizado tu deuda.')
    } catch (err: any) {
      alert('Error al procesar pago: ' + err.message)
    } finally {
      setPaymentLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-roda-green'
      case 'paid': return 'text-blue-400'
      case 'rejected': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado'
      case 'paid': return 'Pagado'
      case 'rejected': return 'Rechazado'
      case 'pending': return 'Pendiente'
      default: return status
    }
  }

  const formatMoney = (amount: number) => `$${amount.toLocaleString()}`

  return (
    <div className="bg-dark-bg min-h-screen text-light-text">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[80vh]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black font-mono mb-4 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500" style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(to right, white, #6b7280)'
          }}>
            MIS CRÉDITOS
          </h1>
          <p className="text-gray-text max-w-lg mx-auto">
            Consulta el estado de tu solicitud y tus planes de pago ingresando tu correo electrónico.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-36 text-white focus:border-roda-green focus:outline-none focus:ring-1 focus:ring-roda-green transition-all placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-roda-green text-dark-bg px-6 rounded-full font-bold text-sm hover:bg-[#b8e000] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? <i className="ph ph-spinner animate-spin text-xl"></i> : 'CONSULTAR'}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-red-400 bg-red-900/20 py-2 px-4 rounded-lg border border-red-900/50 text-sm">
              {error}
            </p>
          )}
        </div>

        {searched && credits.length === 0 && !error && (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-gray-500 text-6xl mb-4"><i className="ph ph-files"></i></div>
            <h3 className="text-xl font-bold text-white mb-2">No encontramos créditos</h3>
            <p className="text-gray-400 mb-6">No hay solicitudes asociadas a este correo.</p>
            <Link href="/catalog" className="text-roda-green hover:underline font-mono text-sm">
              VER CATÁLOGO DE VEHÍCULOS &rarr;
            </Link>
          </div>
        )}

        {credits.length > 0 && (
          <div className="space-y-6 pb-20 fade-in-up">
            {credits.map((credit) => (
              <div key={credit.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded-full font-medium border ${credit.status === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                        credit.status === 'paid' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                          credit.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                            'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                        }`}>
                        {getStatusLabel(credit.status)}
                      </span>
                      <span className="text-gray-500 text-xs font-mono">#{credit.id.toString().padStart(4, '0')}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{credit.vehicle?.name || 'Vehículo Roda'}</h3>
                    <p className="text-sm text-gray-400">Solicitado el {new Date(credit.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase mb-1">Monto Financiado</p>
                    <p className="text-xl font-mono font-bold text-white">{formatMoney(credit.amount)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-white/10 border-b mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Plazo</p>
                    <p className="font-mono text-white">{credit.term_months} Meses</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Cuota Mensual</p>
                    <p className="font-mono text-white">{formatMoney(credit.monthly_payment)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Total Pagado</p>
                    <p className="font-mono text-roda-green">{formatMoney(credit.total_paid || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Deuda Restante</p>
                    <p className="font-mono text-white">{formatMoney((credit.total_debt || 0) - (credit.total_paid || 0))}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Pagado: {formatMoney(credit.total_paid || 0)}</span>
                    <span className="text-white font-mono">
                      {Math.round(((credit.total_paid || 0) / (credit.total_debt || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-roda-green transition-all duration-1000"
                      style={{ width: `${Math.min(100, ((credit.total_paid || 0) / (credit.total_debt || 1)) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">Total: {formatMoney(credit.total_debt || 0)}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="flex justify-end border-t border-white/10 pt-6 mt-2">
                  {credit.status !== 'paid' && credit.status !== 'rejected' && (
                    <button
                      onClick={() => handlePayment(credit.id, credit.monthly_payment)}
                      disabled={paymentLoading === credit.id}
                      className="w-full md:w-auto bg-roda-green text-dark-bg px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#b8e000] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {paymentLoading === credit.id ? (
                        <><i className="ph ph-spinner animate-spin"></i> Procesando...</>
                      ) : (
                        <><i className="ph ph-credit-card"></i> PAGAR CUOTA</>
                      )}
                    </button>
                  )}
                  {credit.status === 'paid' && (
                    <div className="w-full md:w-auto bg-white/10 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 cursor-default opacity-75 border border-white/10">
                      <i className="ph ph-check-circle text-roda-green"></i> CRÉDITO PAGADO
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

