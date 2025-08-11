import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  event: string;
  date: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const images: GalleryImage[] = [
    {
      id: "1",
      src: "/placeholder.svg",
      alt: "Culto Dominical",
      category: "Cultos",
      event: "Culto Dominical",
      date: "Dezembro 2024"
    },
    {
      id: "2",
      src: "/placeholder.svg",
      alt: "Encontro de Jovens",
      category: "Jovens",
      event: "Encontro de Jovens",
      date: "Novembro 2024"
    },
    {
      id: "3",
      src: "/placeholder.svg",
      alt: "Batismo",
      category: "Sacramentos",
      event: "Cerimônia de Batismo",
      date: "Outubro 2024"
    },
    {
      id: "4",
      src: "/placeholder.svg",
      alt: "Escola Dominical",
      category: "Ensino",
      event: "Escola Dominical",
      date: "Dezembro 2024"
    },
    {
      id: "5",
      src: "/placeholder.svg",
      alt: "Encontro da Família",
      category: "Família",
      event: "Encontro da Família",
      date: "Setembro 2024"
    },
    {
      id: "6",
      src: "/placeholder.svg",
      alt: "Ceia do Senhor",
      category: "Sacramentos",
      event: "Ceia do Senhor",
      date: "Dezembro 2024"
    },
    {
      id: "7",
      src: "/placeholder.svg",
      alt: "Coral da Igreja",
      category: "Música",
      event: "Apresentação do Coral",
      date: "Novembro 2024"
    },
    {
      id: "8",
      src: "/placeholder.svg",
      alt: "Conferência",
      category: "Ensino",
      event: "Conferência Reformada",
      date: "Agosto 2024"
    }
  ];

  const categories = ["Todos", ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === "Todos" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cultos":
        return "bg-blue-100 text-blue-800";
      case "Jovens":
        return "bg-green-100 text-green-800";
      case "Sacramentos":
        return "bg-purple-100 text-purple-800";
      case "Ensino":
        return "bg-orange-100 text-orange-800";
      case "Família":
        return "bg-pink-100 text-pink-800";
      case "Música":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Galeria de Fotos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Momentos especiais da nossa comunidade de fé
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Grid de imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(image.category)}>
                      {image.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {image.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm">{image.event}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma imagem encontrada para esta categoria.
            </p>
          </div>
        )}

        {/* Modal para exibir imagem ampliada */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full">
            {selectedImage && (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedImage.event}</h3>
                    <p className="text-muted-foreground">{selectedImage.date}</p>
                  </div>
                  <Badge className={getCategoryColor(selectedImage.category)}>
                    {selectedImage.category}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Gallery;