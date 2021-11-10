// react
import { MutableRefObject } from 'react';
// types
import { CurrentStageSummary } from './StageAssignment';
import { GetRequestStatus, PostRequestStatus } from './ServiceRequests';
import { IdName, Set } from './misc';

export type VehicleStatus = 'active' | 'trash' | 'sold';

export interface BaseVehicle {
  stock: number;
  year: number;
  make: IdName;
  model: IdName;
  trim: IdName;
  notes: string;
  currentStage: {
    stageAssignmentId: string,
    stageId: string,
    personPlaceId: string;
  } | CurrentStageSummary,
  dateAdded: number;
  status: VehicleStatus;
  dateOnLot?: number;
  dateSold?: number;
  reconditionTime?: number;
  forSaleTime?: number;
  totalSellTime?: number;
}

export interface Vehicle extends BaseVehicle {
  id: string;
}

export interface DetailedVehicle extends Vehicle {
  currentStage: CurrentStageSummary;
}

export class VehiclePage {
  docStartNumber: number;
  docEndNumber: number;
  totalDocs: number;
  vehicles: DetailedVehicle[];

  constructor(docStartNumber: number, docEndNumber: number, totalDocs: number, vehicles: DetailedVehicle[]) {
    this.docStartNumber = docStartNumber;
    this.docEndNumber = docEndNumber;
    this.totalDocs = totalDocs;
    this.vehicles = vehicles;
  }
}

export interface AddVehicleParam {
  stock: number;
  year: number;
  make: IdName;
  model: IdName;
  trim: IdName;
  notes: string;
}

export interface NextStock {
  nextStock: number;
}

export interface CheckStock {
  exists: boolean;
  id?: string;
}

export interface BaseModelDoc {
  name: string;
  makeId: string;
  trims: IdName[];
}

export interface ModelDoc extends BaseModelDoc {
  id: string;
}

export interface VehicleDetailFilterState {
  yearFilterTmp: string;
  setYearFilterTmp: Set<string>;
  makeFilterTmp: IdName;
  setMakeFilterTmp: Set<IdName>;
  modelFilterTmp: IdName;
  setModelFilterTmp: Set<IdName>;
  trimFilterTmp: IdName;
  setTrimFilterTmp: Set<IdName>;
}

export interface DateRangeFilterState {
  addedAfterFilterTmp: number | null;
  setAddedAfterFilterTmp: Set<number | null>;
  addedBeforeFilterTmp: number | null;
  setAddedBeforeFilterTmp: Set<number | null>;
  soldAfterFilterTmp: number | null;
  setSoldAfterFilterTmp: Set<number | null>;
  soldBeforeFilterTmp: number | null;
  setSoldBeforeFilterTmp: Set<number | null>;

}

export interface VehicleListState {
  vehiclePage: VehiclePage;
  setVehiclePage: Set<VehiclePage>;
  getVehiclesStatus: GetRequestStatus;
  setGetVehiclesStatus: Set<GetRequestStatus>;
}

export interface AddVehicleState {
  stock: string;
  setStock: Set<string>;
  stockOkay: boolean;
  setStockOkay: Set<boolean>;
  stockError: string;
  setStockError: Set<string>;
  year: string;
  setYear: Set<string>;
  make: IdName;
  setMake: Set<IdName>;
  model: IdName;
  setModel: Set<IdName>;
  trim: IdName;
  setTrim: Set<IdName>;
  stage: IdName;
  setStage: Set<IdName>;
  personPlace: IdName;
  setPersonPlace: Set<IdName>;
  taskList: string[];
  setTaskList: Set<string[]>;
  notes: string;
  setNotes: Set<string>;
  addVehicleStatus: PostRequestStatus;
  setAddVehicleStatus: Set<PostRequestStatus>;
  addedVehicle: DetailedVehicle | null;
  setAddedVehicle: Set<DetailedVehicle | null>;
}

export interface VehicleDetailState {
  mounted: React.MutableRefObject<boolean>;
  vehicle: DetailedVehicle | null;
  setVehicle: Set<DetailedVehicle | null>;
  getVehicleStatus: GetRequestStatus;
  setGetVehicleStatus: Set<GetRequestStatus>;
  updateVehicleStatus: PostRequestStatus;
  setUpdateVehicleStatus: Set<PostRequestStatus>;
  setDisableDoneButton: Set<boolean>;
}

export interface EditStockState {
  stock: string;
  setStock: Set<string>;
  stockOkay: boolean;
  setStockOkay: Set<boolean>;
  stockError: string;
  setStockError: Set<string>;
  addEditVehicleStatus: PostRequestStatus;
}

export interface EditVehicleState {
  vehicleDetailsMounted: MutableRefObject<boolean>;
  mounted: MutableRefObject<boolean>;
  vehicleId: string;
  stock: string;
  editStock: string;
  stockOkay: boolean;
  setStockOkay: Set<boolean>;
  setStockError: Set<string>;
  year: string;
  editYear: string;
  make: IdName;
  editMake: IdName;
  model: IdName;
  editModel: IdName;
  trim: IdName;
  editTrim: IdName;
  dateAdded: number;
  editDateAdded: number;
  dateSold: number | undefined;
  editDateSold: number;
  editVehicleStatus: PostRequestStatus;
  setEditVehicleStatus: Set<PostRequestStatus>;
  setVehicle: Set<DetailedVehicle | null>;
}

export interface EditNotesState {
  vehicleDetailsMounted: MutableRefObject<boolean>;
  mounted: MutableRefObject<boolean>;
  vehicleId: string;
  notes: string;
  editNotes: string;
  editNotesStatus: PostRequestStatus;
  setEditNotesStatus: Set<PostRequestStatus>;
  setVehicle: Set<DetailedVehicle | null>;
}
