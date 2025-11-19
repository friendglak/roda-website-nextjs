export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 md:py-32 px-6 md:px-12 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-light-text mb-16 text-center fade-in-up">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="fade-in-up testimonial-card p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-roda-green/20 flex items-center justify-center mr-4">
                <span className="text-roda-green font-bold">JC</span>
              </div>
              <div>
                <h4 className="text-light-text font-semibold">Juan Carlos</h4>
                <p className="text-gray-text text-sm">Repartidor, Rappi</p>
              </div>
            </div>
            <p className="text-gray-text italic">
              "Desde que tengo mi moto eléctrica con Roda, mis ingresos han
              aumentado un 40%. El proceso fue súper rápido y ahora puedo
              trabajar más horas sin preocuparme por la gasolina."
            </p>
          </div>

          <div className="fade-in-up testimonial-card p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-roda-green/20 flex items-center justify-center mr-4">
                <span className="text-roda-green font-bold">MR</span>
              </div>
              <div>
                <h4 className="text-light-text font-semibold">María Rodríguez</h4>
                <p className="text-gray-text text-sm">Repartidora, Uber Eats</p>
              </div>
            </div>
            <p className="text-gray-text italic">
              "Roda me ayudó a acceder a crédito cuando otros bancos me
              rechazaron. Ahora tengo mi propia moto y estoy construyendo un
              mejor futuro para mi familia."
            </p>
          </div>

          <div className="fade-in-up testimonial-card p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-roda-green/20 flex items-center justify-center mr-4">
                <span className="text-roda-green font-bold">CL</span>
              </div>
              <div>
                <h4 className="text-light-text font-semibold">Carlos López</h4>
                <p className="text-gray-text text-sm">Repartidor, Didi Food</p>
              </div>
            </div>
            <p className="text-gray-text italic">
              "La moto eléctrica es increíble. Es más rápida, no contamina y me
              ahorra mucho dinero. Roda hizo todo el proceso muy fácil y ahora
              estoy ganando más que nunca."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

