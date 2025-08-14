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
import { useApp } from "@/hooks/useApp";
import { Event } from "@/contexts/AppContext";

const Events = () => {
  const { state } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Get unique categories from events
  const categories = ["Todos", ...Array.from(new Set(state.events.map(event => event.category)))];

  // Filter events by category
  const filteredEvents = selectedCategory === "Todos" 
    ? state.events 
    : state.events.filter(event => event.category === selectedCategory);

  // Sort events by date (upcoming first)
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
          <p>Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container text-center">
          <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Eventos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Participe dos nossos eventos e momentos especiais de comunhão e crescimento espiritual
          </p>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Events Grid */}
      <section className="py-16">
        <div className="container">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "Todos" 
                  ? "Não há eventos cadastrados no momento." 
                  : `Não há eventos na categoria "${selectedCategory}".`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)} às {event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      
                      {event.capacity && (
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Vagas: {event.capacity}</span>
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-semibold">
                      {formatDate(selectedEvent.date)} às {selectedEvent.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  
                  {selectedEvent.capacity && (
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <span>Capacidade: {selectedEvent.capacity} pessoas</span>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Badge>{selectedEvent.category}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Descrição</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                  
                  {selectedEvent.registrationLink && (
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <a 
                          href={selectedEvent.registrationLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Inscrever-se no Evento
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
