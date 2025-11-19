export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 bg-[#0a0a0a] border-t border-gray-text/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-roda-green mb-4">RODA</div>
            <p className="text-gray-text text-sm">
              Financiamos la movilidad eléctrica en Latinoamérica.
            </p>
          </div>

          <div>
            <h4 className="text-light-text font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-text text-sm">
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Carreras
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-light-text font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-text text-sm">
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-roda-green transition-colors">
                  Aviso legal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-light-text font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-text hover:text-roda-green transition-colors">
                <i className="ph ph-instagram-logo" style={{ fontSize: '24px' }}></i>
              </a>
              <a href="#" className="text-gray-text hover:text-roda-green transition-colors">
                <i className="ph ph-facebook-logo" style={{ fontSize: '24px' }}></i>
              </a>
              <a href="#" className="text-gray-text hover:text-roda-green transition-colors">
                <i className="ph ph-twitter-logo" style={{ fontSize: '24px' }}></i>
              </a>
              <a href="#" className="text-gray-text hover:text-roda-green transition-colors">
                <i className="ph ph-linkedin-logo" style={{ fontSize: '24px' }}></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-text/10 pt-8 text-center text-gray-text text-sm">
          <p>&copy; 2024 Roda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

