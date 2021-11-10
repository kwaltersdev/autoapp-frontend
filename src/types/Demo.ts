import { Set } from './misc';
import { DeleteRequestStatus, PostRequestStatus } from './ServiceRequests';

export interface Defaults {
  defaultStageAssignment: {
    stage: {
      id: string;
      name: string;
    };
    personPlace: {
      id: string;
      name: string;
    };
  };
};

export interface DemoState {
  mounted: React.RefObject<boolean>;
  loading: boolean;
  setLoading: Set<boolean>;
  error: boolean;
  setError: Set<boolean>;
  clearDatabase: boolean;
  setClearDatabase: Set<boolean>;
  clearDatabaseStatus: DeleteRequestStatus;
  setClearDatabaseStatus: Set<DeleteRequestStatus>;
  addVehicleDescriptors: boolean;
  setAddVehicleDescriptors: Set<boolean>;
  addVehicleDescriptorsStatus: PostRequestStatus;
  setAddVehicleDescriptorsStatus: Set<PostRequestStatus>;
  addStages: boolean;
  setAddStages: Set<boolean>;
  addStagesStatus: PostRequestStatus;
  setAddStagesStatus: Set<PostRequestStatus>;
  generateVehicles: boolean;
  setGenerateVehicles: Set<boolean>;
  generateVehiclesStatus: PostRequestStatus;
  setGenerateVehiclesStatus: Set<PostRequestStatus>;
  vehiclesAmount: string;
  vehiclesAmountError: string;
  months: string;
  monthsError: string;
}

export type DbSelection = 'mongodb' | 'mysql';

export interface UserSettings {
  user: string,
  simulatedLoadingDelay: number; // milliseconds
}