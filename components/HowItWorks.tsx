export function HowItWorks() {
  return (
    <section id="secciones" className="py-32 md:py-48 px-6 bg-dark-bg">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 border-b-2 border-gray-text/20 pb-6">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-light-text fade-in-up">
            Obtén tu crédito<br />en 3 pasos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="fade-in-up benefit-card group">
            <div className="mb-8">
              <span className="font-mono text-roda-green text-sm uppercase tracking-widest block mb-4">Paso 01</span>
              <div className="text-roda-green text-7xl md:text-8xl font-black mb-6 leading-none">1</div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-light-text mb-6 group-hover:text-roda-green transition-colors">
              Aplica
            </h3>
            <p className="text-gray-text text-lg leading-relaxed">
              Completa nuestro formulario en línea en minutos. Solo necesitas
              información básica para comenzar.
            </p>
          </div>

          <div className="fade-in-up benefit-card group">
            <div className="mb-8">
              <span className="font-mono text-roda-green text-sm uppercase tracking-widest block mb-4">Paso 02</span>
              <div className="text-roda-green text-7xl md:text-8xl font-black mb-6 leading-none">2</div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-light-text mb-6 group-hover:text-roda-green transition-colors">
              Recibe tu moto
            </h3>
            <p className="text-gray-text text-lg leading-relaxed">
              Una vez aprobado, te entregamos tu vehículo eléctrico listo para
              comenzar a trabajar.
            </p>
          </div>

          <div className="fade-in-up benefit-card group">
            <div className="mb-8">
              <span className="font-mono text-roda-green text-sm uppercase tracking-widest block mb-4">Paso 03</span>
              <div className="text-roda-green text-7xl md:text-8xl font-black mb-6 leading-none">3</div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-light-text mb-6 group-hover:text-roda-green transition-colors">
              Aumenta tus ingresos
            </h3>
            <p className="text-gray-text text-lg leading-relaxed">
              Comienza a generar más ingresos con tu nuevo vehículo eléctrico y
              mejora tu estabilidad financiera.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

