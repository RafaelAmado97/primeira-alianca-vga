import { Clock, MapPin, Phone, Users, Calendar, Heart, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Official {
  name: string;
  position: string;
  phone: string;
  type: "presbitero" | "diacono";
}

const Index = () => {
  const officials: Official[] = [
    { name: "João Silva", position: "Presbítero", phone: "(35) 99999-1111", type: "presbitero" },
    { name: "Pedro Santos", position: "Presbítero", phone: "(35) 99999-2222", type: "presbitero" },
    { name: "José Oliveira", position: "Presbítero", phone: "(35) 99999-3333", type: "presbitero" },
    { name: "Maria Costa", position: "Diácona", phone: "(35) 99999-4444", type: "diacono" },
    { name: "Ana Paula", position: "Diácona", phone: "(35) 99999-5555", type: "diacono" },
    { name: "Carlos Lima", position: "Diácono", phone: "(35) 99999-6666", type: "diacono" },
  ];

  const schedules = [
    { day: "Quinta-feira", time: "19:30", type: "Culto de Oração" },
    { day: "Domingo", time: "9:30 - 11:30", type: "Escola Dominical e Culto Matutino" },
    { day: "Domingo", time: "18:30 - 19:30", type: "Culto Vespertino" },
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
            Uma igreja reformada comprometida com a Palavra de Deus e o serviço ao próximo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Heart className="h-5 w-5 mr-2" />
              Conheça Nossa Igreja
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Users className="h-5 w-5 mr-2" />
              Participe dos Cultos
            </Button>
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
                  <h3 className="text-xl font-semibold mb-2">Rev. Paulo Mendes</h3>
                  <p className="text-muted-foreground">
                    Liderando nossa comunidade com amor e dedicação à Palavra de Deus
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
                      <div className="text-sm text-muted-foreground">{schedule.time}</div>
                      <div className="text-sm text-primary">{schedule.type}</div>
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
                  <p className="text-muted-foreground">Jardim Canaã - Varginha, MG</p>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ver no Mapa
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
                  {officials.filter(official => official.type === "presbitero").map((official, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-semibold">{official.name}</div>
                        <div className="text-sm text-muted-foreground">{official.position}</div>
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
                  {officials.filter(official => official.type === "diacono").map((official, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-semibold">{official.name}</div>
                        <div className="text-sm text-muted-foreground">{official.position}</div>
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-100 text-blue-800">Ensino</Badge>
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Encontro de Fé Reformada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aprofundamento na doutrina reformada com estudos bíblicos
                </p>
                <div className="text-sm text-primary">15 de Dezembro • 19:00</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-100 text-green-800">Família</Badge>
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Encontro da Família</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Momento especial para famílias com atividades para todas as idades
                </p>
                <div className="text-sm text-primary">22 de Dezembro • 15:00</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-purple-100 text-purple-800">Celebração</Badge>
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Aniversário da Igreja</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Celebração especial com culto e confraternização
                </p>
                <div className="text-sm text-primary">10 de Janeiro • 10:00</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button size="lg">
              Ver Todos os Eventos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
