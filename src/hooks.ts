// react
import { useEffect, useRef } from 'react';
// react-router
import { useLocation, useParams } from 'react-router-dom';
// THIS PROJECT
// types
import { VehicleStatus } from './types/Vehicle';
import { ListOrder, Page } from './types/misc';

export function useCheckMounted() {
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  });

  return mounted;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useVehiclePage() {
  interface ParamTypes {
    statusParam: VehicleStatus;
    sortParam: ListOrder;
    perPageParam: string;
    pageParam: Page;
    compareParam: string;
  }
  return useParams<ParamTypes>();
}

