export function Stats() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-dark-bg border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          <div className="fade-in-up text-center">
            <div className="text-5xl md:text-6xl font-bold text-roda-green mb-2">10K+</div>
            <p className="text-gray-text text-lg">Clientes activos</p>
          </div>
          <div className="fade-in-up text-center">
            <div className="text-5xl md:text-6xl font-bold text-roda-green mb-2">$50M+</div>
            <p className="text-gray-text text-lg">En créditos otorgados</p>
          </div>
          <div className="fade-in-up text-center">
            <div className="text-5xl md:text-6xl font-bold text-roda-green mb-2">40%</div>
            <p className="text-gray-text text-lg">Aumento promedio de ingresos</p>
          </div>
          <div className="fade-in-up text-center">
            <div className="text-5xl md:text-6xl font-bold text-roda-green mb-2">24h</div>
            <p className="text-gray-text text-lg">Tiempo promedio de aprobación</p>
          </div>
        </div>
      </div>
    </section>
  )
}

