import { Church, MapPin, Clock, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Church className="h-6 w-6" />
              <span className="font-bold text-lg">2ª Igreja Presbiteriana de Varginha</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Uma igreja reformada comprometida com a Palavra de Deus e o serviço ao próximo.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informações de Contato</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Rua Canadá, 321, Jardim Canaã - Varginha, MG</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(35) 3221-0000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Horários de Culto</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Quinta-feira: 19:30</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Domingo: 9:30-11:30 e 18:30-19:30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 2ª Igreja Presbiteriana de Varginha. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;