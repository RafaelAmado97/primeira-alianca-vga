import {
  Clock,
  MapPin,
  Phone,
  Users,
  Calendar,
  Heart,
  Church,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";
import { useApp } from "@/hooks/useApp";
import { Event } from "@/contexts/AppContext";

interface Official {
  name: string;
  position: string;
  phone: string;
  type: "presbitero" | "diacono";
}

const Index = () => {
  const { state } = useApp();
  const officials: Official[] = [
    {
      name: "Sebastião Pessoa",
      position: "Presbítero",
      phone: "(35) 99100-2095",
      type: "presbitero",
    },
    {
      name: "Rodrigo Schneider",
      position: "Presbítero",
      phone: "(16) 99788-8451",
      type: "presbitero",
    },
    {
      name: "Márcio Oliveira",
      position: "Presbítero",
      phone: "(35) 98833-0984",
      type: "presbitero",
    },
    {
      name: "Luiz Gustavo",
      position: "Presbítero",
      phone: "(35) 98868-4959",
      type: "presbitero",
    },
    {
      name: "Felipe Muniz",
      position: "Diácono",
      phone: "(35) 99142-6937",
      type: "diacono",
    },
    {
      name: "Juliano Machado",
      position: "Diácono",
      phone: "(35) 99953-4601",
      type: "diacono",
    },
    {
      name: "Rafael Amado",
      position: "Diácono",
      phone: "(31) 98578-6728",
      type: "diacono",
    },
    {
      name: "Ricardo Carvalho",
      position: "Diácono",
      phone: "(31) 99825-0779",
      type: "diacono",
    },
  ];

  const schedules = [
    { day: "Quinta-feira", time: "19:30", type: "Culto de Oração" },
    { day: "Domingo", time: "9:30 - 11:30", type: "Escola Dominical" },
    { day: "Domingo", time: "18:30 - 19:30", type: "Culto" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container text-center">
          <div className="flex justify-center mb-6">
            <Church className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            2ª Igreja Presbiteriana de Varginha
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Uma igreja reformada comprometida com a Palavra de Deus!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sobre">
              <Button size="lg" className="text-lg px-8">
                <Heart className="h-5 w-5 mr-2" />
                Conheça Nossa Igreja
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Informações da Igreja */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Informações da Igreja
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa saber para nos visitar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pastor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Pastor Titular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src={`${import.meta.env.BASE_URL}images/pastor.jpeg`}
                    alt="Foto do Pastor Ben-Hur Judah"
                    className="mx-auto mb-4 rounded-full w-32 h-32 object-cover shadow"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    Rev. Ben-Hur Judah
                  </h3>
                  <p className="text-muted-foreground">
                    Liderando nossa comunidade com amor e dedicação à Palavra de
                    Deus
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Horários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Horários de Culto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3">
                      <div className="font-semibold">{schedule.day}</div>
                      <div className="text-sm text-muted-foreground">
                        {schedule.time}
                      </div>
                      <div className="text-sm text-primary">
                        {schedule.type}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Nossa Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">Rua Canadá, 321</p>
                  <p className="text-muted-foreground">
                    Jardim Canaã - Varginha, MG
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    asChild
                  >
                    <a
                      href="https://www.google.com/maps?sca_esv=e4e61ca27f8efc23&rlz=1C1VDKB_enBR1141BR1141&sxsrf=AE3TifMnCB_9r5DNSZz2WDT_MpDoL-ZIiQ:1754917522313&kgmid=/g/11fsj5s9h5&shndl=30&shem=lcuae,sdl1pl,uaasie&kgs=90374b2d1a643aee&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KWfHR0mEk8qUMSTIOoO80nzM&daddr=R.+Canad%C3%A1,+321+-+Jardim+Canaa,+Varginha+-+MG,+37026-190"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver no Mapa
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Oficiais da Igreja */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Oficiais da Igreja
            </h2>
            <p className="text-xl text-muted-foreground">
              Conheça os líderes que servem nossa comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Presbíteros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">
                    Presbíteros
                  </Badge>
                  <div className="text-lg">Governo da Igreja</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {officials
                    .filter((official) => official.type === "presbitero")
                    .map((official, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-accent/20 rounded-lg"
                      >
                        <div>
                          <div className="font-semibold">{official.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {official.position}
                          </div>
                        </div>
                        <a
                          href={`tel:${official.phone}`}
                          className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          <span className="text-sm">{official.phone}</span>
                        </a>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Diáconos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    Diáconos
                  </Badge>
                  <div className="text-lg">Serviço e Assistência</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {officials
                    .filter((official) => official.type === "diacono")
                    .map((official, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-accent/20 rounded-lg"
                      >
                        <div>
                          <div className="font-semibold">{official.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {official.position}
                          </div>
                        </div>
                        <a
                          href={`tel:${official.phone}`}
                          className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          <span className="text-sm">{official.phone}</span>
                        </a>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Próximos Eventos */}
      <section className="py-16 bg-accent/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Próximos Eventos
            </h2>
            <p className="text-xl text-muted-foreground">
              Não perca os encontros especiais da nossa igreja
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.events
              .filter((event: Event) => new Date(event.date) >= new Date())
              .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 3)
              .map((event: Event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge>{event.category}</Badge>
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    <div className="text-sm text-primary">
                      {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      {event.time ? ` • ${event.time}` : ''}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/eventos">
              <Button size="lg">Ver Todos os Eventos</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
