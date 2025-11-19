'use client'

import { AsciiScene } from './ascii-scene'

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="hero-bg min-h-screen relative pt-32 px-6 overflow-hidden flex items-center">
      <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content - Left */}
        <div className="flex flex-col items-start text-left">
          <div className="overflow-hidden mb-6">
            <p className="hero-sub font-mono text-roda-green text-sm md:text-base uppercase tracking-widest animate-reveal">
              Fintech • LatAm • 2024
            </p>
          </div>

          <div className="mb-12">
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.85] text-light-text">
              <div className="overflow-hidden">
                <span className="hero-line block">Financiamos</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-line block">la movilidad</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-line block text-roda-green text-glow">eléctrica</span>
              </div>
            </h1>
          </div>

          <div className="max-w-2xl mb-12">
            <p className="text-lg md:text-xl text-gray-text leading-relaxed">
              Roda ayuda a los trabajadores de la economía digital y a los
              repartidores de última milla a moverse más rápido, aumentar sus
              ingresos y acceder a crédito para adquirir vehículos eléctricos.
            </p>
          </div>

          <button
            onClick={onOpenModal}
            className="bg-roda-green text-dark-bg px-10 py-5 rounded-full font-mono font-bold uppercase text-sm tracking-wider hover:bg-[#b8e000] transition-all transform hover:scale-105 btn-pulse btn-glow cursor-pointer"
          >
            Solicita un crédito
          </button>
        </div>

        {/* ASCII Art - Right */}
        <div className="h-[50vh] lg:h-[80vh] w-full relative">
          <AsciiScene />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        <div className="w-16 h-16 rounded-full border border-gray-text/30 flex items-center justify-center animate-spin-slow">
          <i className="ph ph-arrow-down text-gray-text animate-spin-slow-reverse" style={{ fontSize: '20px' }}></i>
        </div>
        <span className="font-mono text-xs uppercase text-gray-text hidden md:block">Scroll</span>
      </div>
    </section>
  )
}

