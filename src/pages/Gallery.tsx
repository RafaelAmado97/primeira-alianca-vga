import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useApp } from "@/hooks/useApp";
import { GalleryImage } from "@/contexts/AppContext";
import { ImageIcon } from "lucide-react";

const Gallery = () => {
  const { state } = useApp();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Get unique categories from gallery images
  const categories = ["Todos", ...Array.from(new Set(state.galleryImages.map(image => image.category)))];

  // Filter images by category
  const filteredImages = selectedCategory === "Todos" 
    ? state.galleryImages 
    : state.galleryImages.filter(image => image.category === selectedCategory);

  // Sort images by date (newest first)
  const sortedImages = filteredImages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando galeria...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container text-center">
          <ImageIcon className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Galeria de Fotos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Momentos especiais da nossa comunidade de fé
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          {sortedImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma imagem encontrada</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "Todos" 
                  ? "Não há imagens na galeria no momento." 
                  : `Não há imagens na categoria "${selectedCategory}".`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedImages.map((image) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {image.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {image.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{image.event}</span>
                      <span>{formatDate(image.date)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative max-h-96 overflow-hidden rounded-lg">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                  <Badge>{selectedImage.category}</Badge>
                </div>
                
                <p className="text-muted-foreground">{selectedImage.description}</p>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
                  <span><strong>Evento:</strong> {selectedImage.event}</span>
                  <span><strong>Data:</strong> {formatDate(selectedImage.date)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
