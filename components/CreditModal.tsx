'use client'

import { useEffect, useState } from 'react'
import { Vehicle } from '../app/types'
import { createClient, createCreditApplication, fetchVehicles } from '../app/lib/api'
import { gsap } from 'gsap'

interface CreditModalProps {
  onClose: () => void
  selectedVehicle?: Vehicle | null
}

export function CreditModal({ onClose, selectedVehicle }: CreditModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  })

  // Simulation State
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)
  const [downPayment, setDownPayment] = useState<number>(0)
  const [months, setMonths] = useState<number>(12)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)
  
  const INTEREST_RATE = 0.02 // 2% monthly

  // Initialize
  useEffect(() => {
    if (selectedVehicle) {
      setCurrentVehicle(selectedVehicle)
      setDownPayment(selectedVehicle.price * 0.1) // 10% default
    } else {
      // Fetch vehicles if not provided
      fetchVehicles().then(setVehicles).catch(console.error)
    }
  }, [selectedVehicle])

  // Calculate Payment
  useEffect(() => {
    if (currentVehicle) {
      const principal = currentVehicle.price - downPayment
      if (principal <= 0) {
        setMonthlyPayment(0)
        return
      }
      // PMT formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const r = INTEREST_RATE
      const n = months
      const pmt = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setMonthlyPayment(pmt)
    }
  }, [currentVehicle, downPayment, months])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!currentVehicle) throw new Error("Selecciona un vehículo")

      // 1. Create Client
      let client
      try {
          client = await createClient({
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone
          })
      } catch (e: any) {
          // If client exists, we might proceed or handle it. 
          // For this MVP, if createClient fails with "Email already registered", 
          // we ideally should fetch that client. But we don't have a public endpoint for that.
          // Let's just show the error for now.
          throw e
      }

      // 2. Create Application
      await createCreditApplication({
        client_id: client.id,
        vehicle_id: currentVehicle.id,
        amount: currentVehicle.price - downPayment,
        term_months: months,
        interest_rate: INTEREST_RATE,
        monthly_payment: monthlyPayment
      })

      setStep('success')
      
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al procesar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep('form')
    setError('')
    setFormData({ name: '', email: '', phone: '', city: '' })
    onClose()
  }

  return (
    <dialog
      id="credit-modal"
      className="modal-overlay"
      aria-labelledby="modal-title"
    >
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 id="modal-title" className="text-2xl font-bold text-light-text">
            {step === 'form' ? 'Solicita tu crédito' : '¡Solicitud Enviada!'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-text hover:text-light-text"
            aria-label="Cerrar modal"
          >
            <i className="ph ph-x" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Selection */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-roda-green font-mono text-sm mb-3 uppercase">Simulación</h4>
                
                {!selectedVehicle && (
                     <div className="mb-4">
                        <label className="block text-gray-text text-sm mb-2">Vehículo</label>
                        <select 
                            className="w-full px-4 py-2 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text"
                            onChange={(e) => {
                                const v = vehicles.find(v => v.id === Number(e.target.value))
                                setCurrentVehicle(v || null)
                            }}
                            required
                        >
                            <option value="">Selecciona un vehículo...</option>
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>{v.name} - ${v.price.toLocaleString()}</option>
                            ))}
                        </select>
                     </div>
                )}

                {currentVehicle && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-white font-bold">{currentVehicle.name}</p>
                            <p className="text-sm text-gray-400">Precio: ${currentVehicle.price.toLocaleString()}</p>
                        </div>
                        <div>
                            <label className="block text-gray-text text-xs mb-1">Cuota Inicial</label>
                            <input 
                                type="number" 
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                className="w-full px-3 py-1 bg-dark-bg border border-roda-green/20 rounded text-light-text text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-text text-xs mb-1">Plazo (Meses)</label>
                            <select 
                                value={months}
                                onChange={(e) => setMonths(Number(e.target.value))}
                                className="w-full px-3 py-1 bg-dark-bg border border-roda-green/20 rounded text-light-text text-sm"
                            >
                                {[6, 12, 18, 24, 36].map(m => (
                                    <option key={m} value={m}>{m} meses</option>
                                ))}
                            </select>
                        </div>
                        <div className="bg-roda-green/20 p-2 rounded flex flex-col justify-center items-center">
                             <span className="text-xs text-gray-300">Cuota Mensual Aprox.</span>
                             <span className="text-lg font-bold text-roda-green">${Math.round(monthlyPayment).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-text text-sm mb-2">Nombre completo</label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
                    />
                </div>
                <div>
                    <label className="block text-gray-text text-sm mb-2">Email</label>
                    <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
                    />
                </div>
                <div>
                    <label className="block text-gray-text text-sm mb-2">Teléfono</label>
                    <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
                    />
                </div>
                <div>
                    <label className="block text-gray-text text-sm mb-2">Ciudad</label>
                    <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || !currentVehicle}
              className="w-full bg-roda-green text-dark-bg py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : 'Enviar Solicitud'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-roda-green/20 text-roda-green mb-4">
                <i className="ph ph-check" style={{ fontSize: '32px' }}></i>
             </div>
             <h4 className="text-2xl font-bold text-white mb-2">¡Solicitud Recibida!</h4>
             <p className="text-gray-text mb-6">
                Hemos recibido tu solicitud para el <strong>{currentVehicle?.name}</strong>. 
                <br/>Un asesor se pondrá en contacto contigo al {formData.phone}.
             </p>
             <button
                onClick={handleClose}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors"
             >
                Cerrar
             </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
