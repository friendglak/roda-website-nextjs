export function CTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-light-text mb-6 fade-in-up">
          ¿Listo para aumentar tus ingresos?
        </h2>
        <p className="text-xl text-gray-text mb-8 fade-in-up">
          Únete a miles de trabajadores que ya están transformando su futuro con
          Roda.
        </p>
        <button
          onClick={onOpenModal}
          className="bg-roda-green text-dark-bg px-10 py-5 rounded-lg font-bold text-xl hover:bg-opacity-90 transition-all transform hover:scale-105 btn-pulse fade-in-up cursor-pointer"
        >
          Solicita tu crédito ahora
        </button>
      </div>
    </section>
  )
}

