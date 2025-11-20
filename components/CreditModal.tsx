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
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  })

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

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      city: ''
    }
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
      isValid = false
    } else if (formData.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres'
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingresa un email válido'
      isValid = false
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{7,}$/
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido'
      isValid = false
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Ingresa un número de teléfono válido (mínimo 7 dígitos)'
      isValid = false
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = 'La ciudad es requerida'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

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
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar bg-[#141414] border border-white/10 shadow-2xl rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 id="modal-title" className="text-2xl font-bold text-white">
            {step === 'form' ? 'Solicita tu crédito' : '¡Solicitud Enviada!'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <i className="ph ph-x" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Selection */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h4 className="text-roda-green font-mono text-sm mb-4 uppercase tracking-wider font-bold" style={{ color: '#CFFC00' }}>Simulación de Crédito</h4>

              {!selectedVehicle && (
                <div className="mb-4">
                  <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Vehículo</label>
                  <select
                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white focus:border-roda-green focus:outline-none transition-colors appearance-none"
                    onChange={(e) => {
                      const v = vehicles.find(v => v.id === Number(e.target.value))
                      setCurrentVehicle(v || null)
                    }}
                    required
                  >
                    <option value="" className="text-gray-500">Selecciona un vehículo...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id} className="bg-dark-bg text-white">{v.name} - ${v.price.toLocaleString()}</option>
                    ))}
                  </select>
                </div>
              )}

              {currentVehicle && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                    <p className="text-white font-bold text-xl">{currentVehicle.name}</p>
                    <p className="text-sm text-gray-400">Precio de lista: <span className="font-mono text-white">${currentVehicle.price.toLocaleString()}</span></p>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Cuota Inicial</label>
                    <input
                      type="text"
                      value={downPayment > 0 ? `$ ${downPayment.toLocaleString('es-CO')}` : ''}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/\D/g, ''))
                        setDownPayment(val)
                      }}
                      placeholder="$ 0"
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-sm focus:border-roda-green focus:outline-none transition-colors placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Plazo (Meses)</label>
                    <select
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-sm focus:border-roda-green focus:outline-none transition-colors appearance-none"
                    >
                      {[6, 12, 18, 24, 36].map(m => (
                        <option key={m} value={m} className="bg-dark-bg text-white">{m} meses</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-full bg-roda-green/10 p-4 rounded-lg border border-roda-green/20 flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-300 uppercase font-bold">Cuota Mensual Aprox.</span>
                    <span className="text-2xl font-mono font-bold text-roda-green">${Math.round(monthlyPayment).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Nombre completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:border-roda-green focus:bg-black/60 transition-all placeholder-gray-500`}
                />
                {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Ej. juan@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:border-roda-green focus:bg-black/60 transition-all placeholder-gray-500`}
                />
                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Teléfono</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. +57 300 123 4567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${formErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:border-roda-green focus:bg-black/60 transition-all placeholder-gray-500`}
                />
                {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-300 text-xs uppercase font-bold mb-2">Ciudad</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Bogotá"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border ${formErrors.city ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:border-roda-green focus:bg-black/60 transition-all placeholder-gray-500`}
                />
                {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50">{error}</p>}

            <button
              type="submit"
              disabled={loading || !currentVehicle}
              className="w-full bg-[#CFFC00] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#b8e000] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#CFFC00]/20 cursor-pointer mt-4 border-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ph ph-spinner animate-spin"></i> Procesando...
                </span>
              ) : 'Enviar Solicitud'}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-roda-green/10 text-roda-green mb-6 border border-roda-green/20">
              <i className="ph ph-check" style={{ fontSize: '40px' }}></i>
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">¡Solicitud Recibida!</h4>
            <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
              Hemos recibido tu solicitud para el <span className="text-white font-bold">{currentVehicle?.name}</span>.
              <br />Un asesor se pondrá en contacto contigo al <span className="text-white font-mono">{formData.phone}</span> en breve.
            </p>
            <button
              onClick={handleClose}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-colors font-medium cursor-pointer border border-white/10"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
