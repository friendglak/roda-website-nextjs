export function Benefits() {
  return (
    <section id="beneficios" className="py-32 md:py-48 px-6 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 border-b-2 border-gray-text/20 pb-6">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-light-text fade-in-up">
            Beneficios
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="fade-in-up benefit-card group glass-panel p-8 rounded-2xl">
            <div className="mb-6">
              <i className="ph ph-currency-dollar text-roda-green" style={{ fontSize: '48px' }}></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-light-text mb-4 group-hover:text-roda-green transition-colors">
              Aumenta tus ingresos
            </h3>
            <p className="text-gray-text text-base leading-relaxed">
              Con un vehículo eléctrico, puedes trabajar más horas y aumentar
              significativamente tus ganancias diarias.
            </p>
          </div>

          <div className="fade-in-up benefit-card group glass-panel p-8 rounded-2xl">
            <div className="mb-6">
              <i className="ph ph-credit-card text-roda-green" style={{ fontSize: '48px' }}></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-light-text mb-4 group-hover:text-roda-green transition-colors">
              Accede a crédito
            </h3>
            <p className="text-gray-text text-base leading-relaxed">
              Proceso de aprobación rápido y flexible, diseñado para
              trabajadores de la economía digital.
            </p>
          </div>

          <div className="fade-in-up benefit-card group glass-panel p-8 rounded-2xl">
            <div className="mb-6">
              <i className="ph ph-lightning text-roda-green" style={{ fontSize: '48px' }}></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-light-text mb-4 group-hover:text-roda-green transition-colors">
              Muévete más rápido
            </h3>
            <p className="text-gray-text text-base leading-relaxed">
              Los vehículos eléctricos son más rápidos y eficientes,
              permitiéndote completar más entregas.
            </p>
          </div>

          <div className="fade-in-up benefit-card group glass-panel p-8 rounded-2xl">
            <div className="mb-6">
              <i className="ph ph-shield-check text-roda-green" style={{ fontSize: '48px' }}></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-light-text mb-4 group-hover:text-roda-green transition-colors">
              Mejora tu estabilidad financiera
            </h3>
            <p className="text-gray-text text-base leading-relaxed">
              Construye un futuro más estable con acceso a crédito y mejores
              oportunidades de crecimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

