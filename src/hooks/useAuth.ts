import { useApp } from './useApp';

export const useAuth = () => {
  const { state, login, logout } = useApp();
  return {
    user: state.user,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'admin',
    isModerator: state.user?.role === 'moderator',
    login,
    logout,
  };
};
