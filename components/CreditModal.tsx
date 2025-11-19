'use client'

import { gsap } from 'gsap'

interface CreditModalProps {
  onClose: () => void
}

export function CreditModal({ onClose }: CreditModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.')
    onClose()
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <dialog
      id="credit-modal"
      className="modal-overlay"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="flex justify-between items-center mb-6">
          <h3 id="modal-title" className="text-2xl font-bold text-light-text">
            Solicita tu crédito
          </h3>
          <button
            onClick={onClose}
            className="text-gray-text hover:text-light-text"
            aria-label="Cerrar modal"
          >
            <i className="ph ph-x" style={{ fontSize: '24px' }}></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-text text-sm mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Juan Pérez"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-text text-sm mb-2">
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+57 300 123 4567"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-gray-text text-sm mb-2">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Bogotá"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-roda-green/20 rounded-lg text-light-text focus:outline-none focus:border-roda-green"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-roda-green text-dark-bg py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </dialog>
  )
}

