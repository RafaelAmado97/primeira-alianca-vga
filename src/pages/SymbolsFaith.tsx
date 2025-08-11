import { Download, BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  title: string;
  description: string;
  year: string;
  type: string;
  downloadUrl: string;
  previewUrl?: string;
}

const SymbolsFaith = () => {
  const documents: Document[] = [
    {
      id: "1",
      title: "Confissão de Fé de Westminster",
      description: "O principal documento doutrinário das igrejas reformadas, elaborado pela Assembleia de Westminster (1643-1649). Apresenta de forma sistemática as principais doutrinas bíblicas.",
      year: "1647",
      type: "Confissão",
      downloadUrl: "/docs/confissao-fe-westminster.pdf",
      previewUrl: "#"
    },
    {
      id: "2",
      title: "Catecismo Menor de Westminster",
      description: "Um resumo conciso da doutrina cristã reformada em formato de perguntas e respostas, ideal para o ensino de crianças e novos convertidos.",
      year: "1647",
      type: "Catecismo",
      downloadUrl: "/docs/catecismo-menor-westminster.pdf",
      previewUrl: "#"
    },
    {
      id: "3",
      title: "Catecismo Maior de Westminster",
      description: "Uma exposição mais detalhada da doutrina reformada, complementando o Catecismo Menor com explicações mais profundas das verdades bíblicas.",
      year: "1647",
      type: "Catecismo",
      downloadUrl: "/docs/catecismo-maior-westminster.pdf",
      previewUrl: "#"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Confissão":
        return "bg-blue-100 text-blue-800";
      case "Catecismo":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (document: Document) => {
    // Em um ambiente real, isso faria o download do arquivo
    console.log(`Baixando: ${document.title}`);
    // window.open(document.downloadUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Símbolos de Fé
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Os documentos fundamentais da fé reformada que orientam nossa doutrina e prática
          </p>
          <div className="bg-accent/30 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Os símbolos de fé são documentos históricos que expressam as convicções doutrinárias 
              das igrejas reformadas. Elaborados pela Assembleia de Westminster no século XVII, 
              estes textos continuam sendo a base doutrinária das igrejas presbiterianas em todo o mundo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((document) => (
            <Card key={document.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getTypeColor(document.type)}>
                    {document.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-medium">
                    {document.year}
                  </span>
                </div>
                <CardTitle className="text-xl leading-tight">
                  {document.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {document.description}
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleDownload(document)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  
                  {document.previewUrl && (
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(document.previewUrl, '_blank')}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Visualizar Online
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção informativa adicional */}
        <div className="mt-16 bg-card rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Sobre os Documentos
            </h2>
            <div className="flex justify-center mb-6">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Importância Histórica
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Estes documentos foram elaborados durante um período crucial da história 
                da igreja, estabelecendo fundamentos doutrinários sólidos que perduram 
                há mais de 350 anos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Relevância Atual
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Continuam sendo a base doutrinária das igrejas reformadas, orientando 
                o ensino, a pregação e a vida cristã de milhões de pessoas ao redor do mundo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolsFaith;