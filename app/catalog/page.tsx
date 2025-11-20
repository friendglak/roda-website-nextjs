'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { Loader } from '../../components/Loader'
import { Vehicle, VehicleType } from '../../app/types'
import { fetchVehicles } from '../../app/lib/api'
import { CreditModal } from '../../components/CreditModal'

export default function CatalogPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles()
        // Validate images in data
        const validData = data.map((v: Vehicle) => ({
          ...v,
          image_url: v.image_url || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600" // Fallback
        }))
        setVehicles(validData)
      } catch (error) {
        console.error("Failed to load vehicles", error)
        // Fallback data for demo if backend is not reachable
        setVehicles([
          { id: 1, name: "Roda E-Bike Sport", type: VehicleType.EBIKE, price: 3500000, brand: "Roda", image_url: "https://images.unsplash.com/photo-1571068316344-75bc76f778f7?auto=format&fit=crop&q=80&w=600", description: "Ideal para la ciudad, ligera y rápida." },
          { id: 2, name: "Scooter Pro Max", type: VehicleType.SCOOTER, price: 1800000, brand: "Segway", image_url: "https://images.unsplash.com/photo-1512106374988-c97f527a6d82?auto=format&fit=crop&q=80&w=600", description: "Portabilidad máxima para el último kilómetro." },
          { id: 3, name: "Moped Eléctrico 3000", type: VehicleType.MOPED, price: 7500000, brand: "NIU", image_url: "https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=600", description: "Potencia y autonomía para entregas largas." },
        ])
      } finally {
        setLoading(false)
      }
    }
    loadVehicles()
  }, [])

  const openModal = (vehicle?: Vehicle) => {
    if (vehicle) setSelectedVehicle(vehicle)
    const modal = document.getElementById('credit-modal') as HTMLDialogElement
    if (modal) {
      modal.showModal()
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    setSelectedVehicle(null)
    const modal = document.getElementById('credit-modal') as HTMLDialogElement
    if (modal) {
      modal.classList.remove('active')
      modal.close()
      document.body.style.overflow = ''
    }
  }

  return (
    <div className="bg-dark-bg min-h-screen text-light-text">
      <Loader hidden={!loading} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onOpenModal={() => openModal()} />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black font-mono mb-4 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
          CATÁLOGO
        </h1>
        <p className="text-xl text-gray-text mb-12 max-w-2xl">
          Elige el vehículo que te moverá hacia el futuro. Financiación flexible a tu medida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-roda-green/50 transition-all group backdrop-blur-sm">
              <div className="h-48 bg-gray-800 overflow-hidden relative">
                <img
                  src={vehicle.image_url}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600"
                  }}
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono border border-white/20 uppercase">
                  {vehicle.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-roda-green text-sm font-mono mb-1">{vehicle.brand}</p>
                    <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  </div>
                </div>
                <p className="text-gray-text text-sm mb-6 line-clamp-2">{vehicle.description || "Sin descripción disponible."}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-text uppercase">Precio</span>
                    <span className="text-lg font-mono font-bold">${vehicle.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => openModal(vehicle)}
                    className="bg-roda-green text-dark-bg px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#b8e000] transition-colors cursor-pointer"
                  >
                    Simular Crédito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <CreditModal onClose={closeModal} selectedVehicle={selectedVehicle} />
    </div>
  )
}
