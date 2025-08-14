import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Interfaces
export interface Event {
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
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  event: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'moderator';
  lastLogin: string;
}

// State interface
interface AppState {
  events: Event[];
  galleryImages: GalleryImage[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Actions
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'ADD_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SET_GALLERY_IMAGES'; payload: GalleryImage[] }
  | { type: 'ADD_GALLERY_IMAGE'; payload: GalleryImage }
  | { type: 'UPDATE_GALLERY_IMAGE'; payload: GalleryImage }
  | { type: 'DELETE_GALLERY_IMAGE'; payload: string };

// Initial state
const initialState: AppState = {
  events: [],
  galleryImages: [],
  user: null,
  isLoading: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    case 'SET_GALLERY_IMAGES':
      return { ...state, galleryImages: action.payload };
    case 'ADD_GALLERY_IMAGE':
      return { ...state, galleryImages: [action.payload, ...state.galleryImages] };
    case 'UPDATE_GALLERY_IMAGE':
      return {
        ...state,
        galleryImages: state.galleryImages.map(image =>
          image.id === action.payload.id ? action.payload : image
        ),
      };
    case 'DELETE_GALLERY_IMAGE':
      return {
        ...state,
        galleryImages: state.galleryImages.filter(image => image.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Auth methods
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  // Event methods
  createEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Event>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  // Gallery methods
  createGalleryImage: (image: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>) => Promise<GalleryImage>;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => Promise<GalleryImage>;
  deleteGalleryImage: (id: string) => Promise<void>;
} | null>(null);

// Storage utility class
class LocalStorageDB {
  private static readonly EVENTS_KEY = 'ipv_events';
  private static readonly GALLERY_KEY = 'ipv_gallery';
  private static readonly USER_KEY = 'ipv_user';

  static getEvents(): Event[] {
    try {
      const stored = localStorage.getItem(this.EVENTS_KEY);
      return stored ? JSON.parse(stored) : this.getInitialEvents();
    } catch {
      return this.getInitialEvents();
    }
  }

  static saveEvents(events: Event[]): void {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  static getGalleryImages(): GalleryImage[] {
    try {
      const stored = localStorage.getItem(this.GALLERY_KEY);
      return stored ? JSON.parse(stored) : this.getInitialGallery();
    } catch {
      return this.getInitialGallery();
    }
  }

  static saveGalleryImages(images: GalleryImage[]): void {
    localStorage.setItem(this.GALLERY_KEY, JSON.stringify(images));
  }

  static getUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static saveUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  private static getInitialEvents(): Event[] {
    const now = new Date().toISOString();
    return [
      {
        id: "1",
        title: "Encontro de Fé Reformada",
        date: "2025-12-15",
        time: "19:00",
        location: "Templo Principal",
        description: "Um encontro especial para aprofundamento na doutrina reformada, com estudos bíblicos e momentos de comunhão.",
        category: "Ensino",
        image: "/placeholder.svg",
        registrationLink: "https://forms.google.com/exemplo",
        capacity: 100,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "2",
        title: "Encontro da Família",
        date: "2025-12-22",
        time: "15:00",
        location: "Salão de Eventos",
        description: "Um momento especial para as famílias da igreja se reunirem, com atividades para todas as idades.",
        category: "Família",
        image: "/placeholder.svg",
        createdAt: now,
        updatedAt: now
      }
    ];
  }

  private static getInitialGallery(): GalleryImage[] {
    const now = new Date().toISOString();
    return [
      {
        id: "1",
        src: "/placeholder.svg",
        alt: "Culto Dominical",
        title: "Culto Dominical",
        category: "Cultos",
        event: "Culto Dominical",
        date: "2024-12-01",
        description: "Momento de adoração em família",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "2",
        src: "/placeholder.svg",
        alt: "Encontro de Jovens",
        title: "Encontro de Jovens",
        category: "Jovens",
        event: "Encontro de Jovens",
        date: "2024-11-15",
        description: "Jovens unidos em Cristo",
        createdAt: now,
        updatedAt: now
      }
    ];
  }
}

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const events = LocalStorageDB.getEvents();
      const galleryImages = LocalStorageDB.getGalleryImages();
      const user = LocalStorageDB.getUser();
      
      dispatch({ type: 'SET_EVENTS', payload: events });
      dispatch({ type: 'SET_GALLERY_IMAGES', payload: galleryImages });
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar dados' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Auth methods
  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple authentication (in production, use proper authentication)
    const validCredentials = [
      { username: 'admin', password: 'admin2024', role: 'admin' as const },
      { username: 'moderator', password: 'mod2024', role: 'moderator' as const }
    ];

    const user = validCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (user) {
      const userData: User = {
        id: Date.now().toString(),
        username: user.username,
        role: user.role,
        lastLogin: new Date().toISOString()
      };

      LocalStorageDB.saveUser(userData);
      dispatch({ type: 'SET_USER', payload: userData });
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Credenciais inválidas' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = () => {
    LocalStorageDB.saveUser(null);
    dispatch({ type: 'SET_USER', payload: null });
  };

  // Event methods
  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const now = new Date().toISOString();
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };

    const updatedEvents = [newEvent, ...state.events];
    LocalStorageDB.saveEvents(updatedEvents);
    dispatch({ type: 'ADD_EVENT', payload: newEvent });

    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    const existingEvent = state.events.find(e => e.id === id);
    if (!existingEvent) throw new Error('Evento não encontrado');

    const updatedEvent: Event = {
      ...existingEvent,
      ...eventData,
      updatedAt: new Date().toISOString()
    };

    const updatedEvents = state.events.map(e => e.id === id ? updatedEvent : e);
    LocalStorageDB.saveEvents(updatedEvents);
    dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });

    return updatedEvent;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    const updatedEvents = state.events.filter(e => e.id !== id);
    LocalStorageDB.saveEvents(updatedEvents);
    dispatch({ type: 'DELETE_EVENT', payload: id });
  };

  // Gallery methods
  const createGalleryImage = async (imageData: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>): Promise<GalleryImage> => {
    const now = new Date().toISOString();
    const newImage: GalleryImage = {
      ...imageData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };

    const updatedImages = [newImage, ...state.galleryImages];
    LocalStorageDB.saveGalleryImages(updatedImages);
    dispatch({ type: 'ADD_GALLERY_IMAGE', payload: newImage });

    return newImage;
  };

  const updateGalleryImage = async (id: string, imageData: Partial<GalleryImage>): Promise<GalleryImage> => {
    const existingImage = state.galleryImages.find(i => i.id === id);
    if (!existingImage) throw new Error('Imagem não encontrada');

    const updatedImage: GalleryImage = {
      ...existingImage,
      ...imageData,
      updatedAt: new Date().toISOString()
    };

    const updatedImages = state.galleryImages.map(i => i.id === id ? updatedImage : i);
    LocalStorageDB.saveGalleryImages(updatedImages);
    dispatch({ type: 'UPDATE_GALLERY_IMAGE', payload: updatedImage });

    return updatedImage;
  };

  const deleteGalleryImage = async (id: string): Promise<void> => {
    const updatedImages = state.galleryImages.filter(i => i.id !== id);
    LocalStorageDB.saveGalleryImages(updatedImages);
    dispatch({ type: 'DELETE_GALLERY_IMAGE', payload: id });
  };

  const value = {
    state,
    dispatch,
    login,
    logout,
    createEvent,
    updateEvent,
    deleteEvent,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
