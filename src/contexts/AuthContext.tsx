// react
import { createContext, useContext, useState, useEffect, ReactChild, ReactChildren, useCallback } from 'react';
// react-cookie
import { useCookies } from 'react-cookie';
// THIS PROJECT
// components
import LoadingFullPage from '../components/common/LoadingFullPage';
// hooks
import { useCheckMounted } from '../hooks';
// services
import { getDefaults } from '../services/demo';
// contexts
import { useDemoContext } from './DemoContext';
// types
import { Set } from '../types/misc';
import { Defaults } from '../types/Demo';

interface AuthContextInterface {
  currentUser: string | null;
  loading: boolean;
  logIn: (name: string) => void;
  logOut: () => void;
  userPreferences: Defaults;
  setUserPreferences: Set<Defaults>;
  getUserPreferences: () => Promise<void>;
};

const AuthContext = createContext({});  // creating with an initial blank context, this is okay since we will never be using this context without a provider


export function useAuthContext(): AuthContextInterface {
  if (AuthContext === null) {
    console.error('AuthContext is null, make sure to only use AuthContext within an AuthProvider');
  }
  return useContext(AuthContext) as AuthContextInterface;
}

interface AuthProviderProps {
  children: ReactChild | ReactChildren;
}
export function AuthProvider(props: AuthProviderProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { dbReady, delay } = useDemoContext();
  const { children } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'demoDb', 'demoLoadingTime']);
  const [currentUser, setCurrentUser] = useState<string | null>(cookies.user);
  const [loading, setLoading] = useState(true);

  async function logIn(name: string) {
    mounted.current && setLoading(true);
    await delay();
    setCookie('user', name, { path: '/' });
    mounted.current && setLoading(false);
  };

  async function logOut() {
    mounted.current && setLoading(true);
    await delay();
    removeCookie('user', { path: '/' });
    removeCookie('demoDb', { path: '/' });
    removeCookie('demoLoadingTime', { path: '/' });
    mounted.current && setLoading(false);
  };

  const [userPreferences, setUserPreferences] = useState<Defaults>({
    defaultStageAssignment: {
      stage: {
        id: '',
        name: ''
      },
      personPlace: {
        id: '',
        name: ''
      }
    }
  });

  const getUserPreferences = useCallback(async () => {
    mounted.current && setLoading(true);
    getDefaults()
      .then(result => {
        mounted.current && setLoading(false);
        mounted.current && result.status === 'success' && result.data && setUserPreferences(result.data);
      }, e => {
        mounted.current && setLoading(false);
        mounted.current && console.error(e);
      });

  }, [mounted]);

  useEffect(() => {
    dbReady && getUserPreferences();
  }, [getUserPreferences, dbReady]);

  useEffect(() => {
    setCurrentUser(cookies.user);
  }, [cookies.user]);

  const value: AuthContextInterface = {
    currentUser,
    loading,
    logIn,
    logOut,
    userPreferences,
    setUserPreferences,
    getUserPreferences,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingFullPage /> : children}
    </AuthContext.Provider>
  );
}