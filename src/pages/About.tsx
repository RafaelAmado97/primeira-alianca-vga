import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Users, Heart, Calendar } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container text-center">
          <div className="flex justify-center mb-6">
            <Church className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Nossa História
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Conheça a trajetória da 2ª Igreja Presbiteriana de Varginha
          </p>
        </div>
      </section>

      {/* História da Igreja */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/cruz.jpg"
                alt="Igreja Presbiteriana de Varginha"
                className="rounded-lg border-r-2 shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Fundada em 2016
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  A 2ª Igreja Presbiteriana de Varginha nasceu do coração de Deus 
                  e do desejo de uma comunidade comprometida em espalhar o Evangelho 
                  de Cristo em nossa cidade.
                </p>
                <p>
                  Desde nossa fundação em 2016, temos sido uma igreja reformada 
                  comprometida com a autoridade das Escrituras Sagradas, buscando 
                  viver segundo os princípios bíblicos e reformados.
                </p>
                <p>
                  Nossa missão é glorificar a Deus através da adoração verdadeira, 
                  do discipulado bíblico, sendo sal e luz em nossa comunidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Princípios */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-muted-foreground">
              Os princípios que norteiam nossa caminhada cristã
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Church className="h-5 w-5 mr-2 text-primary" />
                  Autoridade das Escrituras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cremos que a Bíblia é a Palavra de Deus e nossa única regra de fé e prática.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Comunidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Valorizamos a vida em comunidade, o cuidado mútuo e o crescimento 
                  espiritual conjunto através do discipulado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Missão e Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Somos chamados para servir a Deus, usando nossos dons e talentos para a obra do Senhor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Confissões de Fé */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nossa Doutrina
            </h2>
            <p className="text-xl text-muted-foreground">
              Fundamentados nos documentos confessionais reformados
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Confissão de Fé de Westminster
                    </h3>
                    <p className="text-muted-foreground">
                      Seguimos os padrões doutrinários reformados expressos na 
                      Confissão de Fé de Westminster, nos Catecismos Maior e Menor.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Cinco Solas da Reforma
                    </h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Sola Scriptura (Somente a Escritura)</li>
                      <li>• Sola Gratia (Somente a Graça)</li>
                      <li>• Sola Fide (Somente a Fé)</li>
                      <li>• Solus Christus (Somente Cristo)</li>
                      <li>• Soli Deo Gloria (Glória Somente a Deus)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
