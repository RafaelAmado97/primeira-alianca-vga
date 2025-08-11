import { useState } from "react";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
  registrationLink?: string;
  capacity?: number;
}

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: "1",
      title: "Encontro de Fé Reformada",
      date: "15 de Dezembro, 2024",
      time: "19:00",
      location: "Templo Principal",
      description: "Um encontro especial para aprofundamento na doutrina reformada, com estudos bíblicos e momentos de comunhão.",
      category: "Ensino",
      image: "/placeholder.svg",
      registrationLink: "https://forms.google.com/exemplo",
      capacity: 100
    },
    {
      id: "2",
      title: "Encontro da Família",
      date: "22 de Dezembro, 2024",
      time: "15:00",
      location: "Salão de Eventos",
      description: "Um momento especial para as famílias da igreja se reunirem, com atividades para todas as idades, lanche comunitário e muito companheirismo.",
      category: "Família",
      image: "/placeholder.svg",
      registrationLink: "https://forms.google.com/exemplo",
      capacity: 150
    },
    {
      id: "3",
      title: "Aniversário da Igreja",
      date: "10 de Janeiro, 2025",
      time: "10:00",
      location: "Templo Principal",
      description: "Celebração do aniversário da nossa igreja com culto especial, homenagens aos fundadores e confraternização.",
      category: "Celebração",
      image: "/placeholder.svg",
      capacity: 200
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Ensino":
        return "bg-blue-100 text-blue-800";
      case "Família":
        return "bg-green-100 text-green-800";
      case "Celebração":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Eventos da Igreja
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Participe dos nossos eventos e fortaleça sua fé e comunhão
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  {event.capacity && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {event.capacity}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date} às {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <p className="text-sm mt-3 line-clamp-2">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {selectedEvent.date} às {selectedEvent.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {selectedEvent.location}
                    </div>
                    {selectedEvent.capacity && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        Capacidade: {selectedEvent.capacity} pessoas
                      </div>
                    )}
                  </div>

                  <div>
                    <Badge className={getCategoryColor(selectedEvent.category)}>
                      {selectedEvent.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  {selectedEvent.registrationLink && (
                    <div className="flex justify-center">
                      <Button asChild>
                        <a 
                          href={selectedEvent.registrationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Fazer Inscrição
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Events;