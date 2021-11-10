// react
import { createContext, useContext, useState, ReactChild, ReactChildren, useCallback, useEffect } from 'react';
// reat-cookie
import { useCookies } from 'react-cookie';
// THIS PROJECT
// components
import LoadingFullPage from '../components/common/LoadingFullPage';
import CenteredError from '../components/common/CenteredError';
// services
import { selectDatabase as selectDatabaseService } from '../services/demo';
import { DbSelection } from '../types/Demo';
// types
import { Set } from '../types/misc';

interface DemoContextInterface {
  loadingTime: number;
  setLoadingTime: Set<number>;
  db: DbSelection | null;
  setDb: Set<DbSelection | null>;
  dbReady: boolean;
  delay: () => Promise<void>;
  saveLoadingTime: (loadingTimeNum: number) => void;
  saveDb: (dbSelection: DbSelection | null) => void;
  selectDatabase: (dbSelection: DbSelection) => void;
}

const DemoContext = createContext({}); // creating with an initial blank context, this is okay since we will never be using this context without a provider

export function useDemoContext(): DemoContextInterface {
  return useContext(DemoContext) as DemoContextInterface;
}

interface DemoProviderProps {
  children: ReactChild | ReactChildren;
}

export function DemoProvider(props: DemoProviderProps): React.ReactElement {
  const [cookies, setCookie] = useCookies(['demoLoadingTime', 'demoDb']);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(0); // milliseconds
  const [dbReady, setDbReady] = useState<boolean>(false);
  const [db, setDb] = useState<DbSelection | null>(null);
  const [error, setError] = useState<boolean>(false);

  const saveDb = useCallback((dbSelection: DbSelection | null) => {
    setCookie('demoDb', dbSelection, { path: '/' });
  }, [setCookie]);

  useEffect(() => {
    cookies.demoLoadingTime ? setLoadingTime(parseInt(cookies.demoLoadingTime)) : setLoadingTime(500); //set 500 default if cookie is undefined
    cookies.demoDb ? setDb(cookies.demoDb) : saveDb('mongodb'); //set 500 default if cookie is undefined
  }, [cookies.demoLoadingTime, cookies.demoDb, saveDb]);

  function saveLoadingTime(loadingTimeNum: number) {
    setCookie('demoLoadingTime', loadingTimeNum, { path: '/' });
  }

  async function delay() {
    await new Promise(resolve => setTimeout(resolve, loadingTime));
  }

  const selectDatabase = useCallback((dbSelection: DbSelection) => {
    setDbReady(false);
    setLoading(true);
    selectDatabaseService(dbSelection)
      .then(() => {
        setDbReady(true);
        setLoading(false);
      }, e => {
        console.error(e);
        setError(true);
        setDbReady(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    db && selectDatabase(db);
  }, [selectDatabase, db]);

  const value: DemoContextInterface = {
    loadingTime, setLoadingTime, db, setDb, dbReady, delay, saveLoadingTime, saveDb, selectDatabase
  };
  return (
    <DemoContext.Provider value={value}>
      {loading ? <LoadingFullPage /> : error ? <CenteredError errorMessage={`Failed to connect to server. Ensure that 'Selection Server' is listening on localhost:7001 and refresh`} /> : props.children}
    </DemoContext.Provider>
  );
}
