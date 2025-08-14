import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Calendar,
  Save,
  X,
  LogOut,
  Shield,
  Users,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { Event, GalleryImage } from "@/contexts/AppContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const { toast } = useToast();
  const { state, createEvent, updateEvent, deleteEvent, createGalleryImage, updateGalleryImage, deleteGalleryImage } = useApp();
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();
  
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState<"events" | "gallery">("events");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Estados para eventos
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  
  // Estados para galeria
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showImageForm, setShowImageForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    const success = await login(loginForm.username, loginForm.password);
    
    if (success) {
      setLoginForm({ username: "", password: "" });
    }
    
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com segurança.",
    });
  };

  // Funções para eventos
  const handleSaveEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
        toast({
          title: "Evento atualizado!",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        await createEvent(eventData);
        toast({
          title: "Evento criado!",
          description: "O novo evento foi adicionado com sucesso.",
        });
      }
      setEditingEvent(null);
      setShowEventForm(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o evento.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      toast({
        title: "Evento excluído!",
        description: "O evento foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o evento.",
        variant: "destructive",
      });
    }
  };

  // Funções para galeria
  const handleSaveImage = async (imageData: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingImage) {
        await updateGalleryImage(editingImage.id, imageData);
        toast({
          title: "Imagem atualizada!",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        await createGalleryImage(imageData);
        toast({
          title: "Imagem adicionada!",
          description: "A nova imagem foi adicionada à galeria.",
        });
      }
      setEditingImage(null);
      setShowImageForm(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a imagem.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      toast({
        title: "Imagem excluída!",
        description: "A imagem foi removida da galeria.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir a imagem.",
        variant: "destructive",
      });
    }
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
            <p className="text-muted-foreground">
              2ª Igreja Presbiteriana de Varginha
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="Digite seu usuário"
                  required
                  disabled={isLoggingIn}
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Digite sua senha"
                  required
                  disabled={isLoggingIn}
                />
              </div>
              {state.error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                  {state.error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Credenciais de teste:</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Admin: admin / admin2024<br/>
                Moderador: moderator / mod2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <div className="flex items-center gap-2 mt-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Logado como: <strong>{user?.username}</strong> ({user?.role})
              </span>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Eventos</p>
                  <p className="text-2xl font-bold">{state.events.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Imagens</p>
                  <p className="text-2xl font-bold">{state.galleryImages.length}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={() => setActiveTab("events")}
            variant={activeTab === "events" ? "default" : "outline"}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Eventos
          </Button>
          <Button 
            onClick={() => setActiveTab("gallery")}
            variant={activeTab === "gallery" ? "default" : "outline"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Galeria
          </Button>
        </div>

        {/* Conteúdo dos Eventos */}
        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Gerenciar Eventos</h2>
              <Button onClick={() => setShowEventForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            {showEventForm && (
              <EventForm
                event={editingEvent}
                onSave={handleSaveEvent}
                onCancel={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                }}
              />
            )}

            <div className="space-y-4">
              {state.events.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum evento cadastrado</h3>
                  <p className="text-muted-foreground">
                    Clique em "Novo Evento" para adicionar o primeiro evento.
                  </p>
                </div>
              ) : (
                state.events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <p className="text-muted-foreground mb-2">{event.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>📅 {new Date(event.date).toLocaleDateString('pt-BR')}</span>
                            <span>🕒 {event.time}</span>
                            <span>📍 {event.location}</span>
                            <span>🏷️ {event.category}</span>
                            {event.capacity && <span>👥 {event.capacity} vagas</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingEvent(event);
                              setShowEventForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o evento "{event.title}"? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Conteúdo da Galeria */}
        {activeTab === "gallery" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Gerenciar Galeria</h2>
              <Button onClick={() => setShowImageForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Imagem
              </Button>
            </div>

            {showImageForm && (
              <ImageForm
                image={editingImage}
                onSave={handleSaveImage}
                onCancel={() => {
                  setShowImageForm(false);
                  setEditingImage(null);
                }}
              />
            )}

            {state.galleryImages.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma imagem cadastrada</h3>
                <p className="text-muted-foreground">
                  Clique em "Nova Imagem" para adicionar a primeira imagem.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.galleryImages.map((image) => (
                  <Card key={image.id}>
                    <CardContent className="p-4">
                      <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{image.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                        <span>{image.category}</span>
                        <span>{new Date(image.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingImage(image);
                            setShowImageForm(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a imagem "{image.title}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteImage(image.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente do formulário de eventos
const EventForm = ({ 
  event, 
  onSave, 
  onCancel 
}: { 
  event: Event | null;
  onSave: (event: Omit<Event, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    category: event?.category || "",
    image: event?.image || "/placeholder.svg",
    registrationLink: event?.registrationLink || "",
    capacity: event?.capacity || 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Título é obrigatório";
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória";
    if (!formData.date) newErrors.date = "Data é obrigatória";
    if (!formData.time) newErrors.time = "Horário é obrigatório";
    if (!formData.location.trim()) newErrors.location = "Local é obrigatório";
    if (!formData.category.trim()) newErrors.category = "Categoria é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        capacity: formData.capacity > 0 ? formData.capacity : undefined
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{event ? "Editar Evento" : "Novo Evento"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={errors.category ? "border-red-500" : ""}
                placeholder="Ex: Ensino, Família, Jovens"
              />
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className={errors.time ? "border-red-500" : ""}
              />
              {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
            </div>
            <div>
              <Label htmlFor="capacity">Capacidade (opcional)</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity || ""}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 0})}
                placeholder="Número de vagas"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Local *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className={errors.location ? "border-red-500" : ""}
                placeholder="Ex: Templo Principal, Salão de Eventos"
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
            <div>
              <Label htmlFor="registrationLink">Link de Inscrição (opcional)</Label>
              <Input
                id="registrationLink"
                type="url"
                value={formData.registrationLink}
                onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
                placeholder="https://forms.google.com/exemplo"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Componente do formulário de imagens
const ImageForm = ({ 
  image, 
  onSave, 
  onCancel 
}: { 
  image: GalleryImage | null;
  onSave: (image: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: image?.title || "",
    description: image?.description || "",
    src: image?.src || "",
    alt: image?.alt || "",
    category: image?.category || "",
    event: image?.event || "",
    date: image?.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Título é obrigatório";
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória";
    if (!formData.src.trim()) newErrors.src = "URL da imagem é obrigatória";
    if (!formData.alt.trim()) newErrors.alt = "Texto alternativo é obrigatório";
    if (!formData.category.trim()) newErrors.category = "Categoria é obrigatória";
    if (!formData.event.trim()) newErrors.event = "Evento é obrigatório";
    if (!formData.date) newErrors.date = "Data é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{image ? "Editar Imagem" : "Nova Imagem"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="alt">Texto Alternativo *</Label>
              <Input
                id="alt"
                value={formData.alt}
                onChange={(e) => setFormData({...formData, alt: e.target.value})}
                className={errors.alt ? "border-red-500" : ""}
                placeholder="Descrição da imagem para acessibilidade"
              />
              {errors.alt && <p className="text-sm text-red-500 mt-1">{errors.alt}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <Label htmlFor="src">URL da Imagem *</Label>
            <Input
              id="src"
              type="url"
              value={formData.src}
              onChange={(e) => setFormData({...formData, src: e.target.value})}
              className={errors.src ? "border-red-500" : ""}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.src && <p className="text-sm text-red-500 mt-1">{errors.src}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={errors.category ? "border-red-500" : ""}
                placeholder="Ex: Cultos, Jovens, Eventos"
              />
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="event">Evento *</Label>
              <Input
                id="event"
                value={formData.event}
                onChange={(e) => setFormData({...formData, event: e.target.value})}
                className={errors.event ? "border-red-500" : ""}
                placeholder="Nome do evento relacionado"
              />
              {errors.event && <p className="text-sm text-red-500 mt-1">{errors.event}</p>}
            </div>
            <div>
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Admin;
