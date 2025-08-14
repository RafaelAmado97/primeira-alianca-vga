# Guia do Sistema Administrativo

## Funcionalidades Implementadas

### 1. Página "Sobre" (/sobre)
- História da igreja (fundada em 2016)
- Valores e princípios reformados
- Doutrina baseada na Confissão de Fé de Westminster
- Cinco Solas da Reforma
- Conectada ao botão "Conheça Nossa Igreja" na página inicial

### 2. Sistema Administrativo (/admin)
- **Credenciais de acesso:**
  - Usuário: `admin`
  - Senha: `admin2024`

### 3. Gerenciamento de Eventos
- Adicionar novos eventos
- Editar eventos existentes
- Excluir eventos
- Campos: título, descrição, data, horário, local

### 4. Gerenciamento de Galeria
- Adicionar novas imagens
- Editar informações das imagens
- Excluir imagens
- Campos: título, descrição, URL da imagem, data

## Como Usar

### Acessar o Painel Administrativo:
1. Navegue para `/admin` no seu navegador
2. Faça login com as credenciais: admin/admin2024
3. Use as abas "Eventos" e "Galeria" para gerenciar o conteúdo

### Gerenciar Eventos:
1. Clique em "Novo Evento" para adicionar
2. Preencha todos os campos obrigatórios
3. Use os botões de editar/excluir para gerenciar eventos existentes

### Gerenciar Galeria:
1. Clique em "Nova Imagem" para adicionar
2. Insira a URL de uma imagem hospedada online
3. Use os botões de editar/excluir para gerenciar imagens existentes

## Melhorias Futuras Sugeridas

1. **Upload de Imagens**: Implementar upload real de arquivos em vez de URLs
2. **Banco de Dados**: Conectar a um banco de dados real para persistência
3. **Autenticação Robusta**: Sistema de login mais seguro com JWT
4. **Backup**: Sistema de backup dos dados
5. **Múltiplos Usuários**: Diferentes níveis de acesso administrativo

## Estrutura dos Dados

### Eventos
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
}
```

### Imagens da Galeria
```typescript
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string; // YYYY-MM-DD
}
```

## Navegação

- **Página Inicial** (`/`) - Homepage com informações da igreja
- **Sobre** (`/sobre`) - História e valores da igreja
- **Eventos** (`/eventos`) - Lista de eventos (conectada ao admin)
- **Galeria** (`/galeria`) - Galeria de fotos (conectada ao admin)
- **Símbolos de Fé** (`/simbolos-fe`) - Símbolos e doutrinas
- **Admin** (`/admin`) - Painel administrativo

## Tecnologias Utilizadas

- **React** - Framework principal
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes de UI
- **React Router** - Navegação
- **Lucide React** - Ícones
