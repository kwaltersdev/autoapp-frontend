// types
import { VehiclePage, AddVehicleParam, VehicleStatus, DetailedVehicle, NextStock, CheckStock, ModelDoc } from '../types/Vehicle';
import { GetSuccess, PostSuccess, PatchSuccess, PostExists, FailedResult, DeleteSuccess } from '../types/ServiceResults';
import { IdName, ListOrder, Page } from '../types/misc';

const vehicles = 'http://localhost:7000/api/vehicles';

export async function getVehiclesPaged(status: VehicleStatus, sort: ListOrder, perPage: number, page: Page, compare: number, query: string): Promise<GetSuccess<VehiclePage> | FailedResult> {
  const response = await fetch(`${vehicles}/get-vehicles-paged/${status}/${sort}/${perPage}/${page}/${compare}?${query}`);
  const json = await response.json();
  return json;
}

export async function getVehiclesByStatus(statusArray: VehicleStatus[]): Promise<GetSuccess<DetailedVehicle[]> | FailedResult> {
  const queryParams = statusArray.map(status => `status=${status}`).join('&');
  const response = await fetch(vehicles + `?${queryParams}`);
  const json = await response.json();
  return json;
}

export async function findVehicle(field: 'id' | 'stock', value: string): Promise<GetSuccess<DetailedVehicle> | FailedResult> {
  const response = await fetch(`${vehicles}/find?field=${field}&value=${value}`);
  const json = await response.json();
  return json;
};

export async function getNextStock(): Promise<GetSuccess<NextStock> | FailedResult> {
  const response = await fetch(vehicles + '/next-stock');
  const json = await response.json();
  return json;
};

export async function checkStock(stock: string): Promise<GetSuccess<CheckStock> | FailedResult> {
  if (!stock) return new GetSuccess({ exists: false });
  const response = await fetch(`${vehicles}/check-stock?stock=${stock}`);
  const json = await response.json();
  return json;
};

export async function getMakes(): Promise<GetSuccess<IdName[]> | FailedResult> {
  const response = await fetch(vehicles + '/makes');
  const json = await response.json();
  return json;
};

export async function addMake(make: string): Promise<PostSuccess<IdName, IdName[]> | PostExists | FailedResult> {
  const body = { make };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/add-make', options);
  const json = await response.json();
  return json;
};

export async function getModels(makeId: string): Promise<GetSuccess<IdName[]> | FailedResult> {
  const response = await fetch(`${vehicles}/models?makeId=${makeId}`);
  const json = await response.json();
  return json;
};

export async function addModel(makeId: string, model: string): Promise<PostSuccess<ModelDoc, IdName[]> | PostExists | FailedResult> {
  const body = { makeId, model };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/add-model', options);
  const json = await response.json();
  return json;
};

export async function getTrims(modelId: string): Promise<GetSuccess<IdName[]> | FailedResult> {
  const response = await fetch(`${vehicles}/trims?modelId=${modelId}`);
  const json = await response.json();
  return json;
}

export async function addTrim(modelId: string, trim: string): Promise<PatchSuccess<IdName, ModelDoc, IdName[]> | PostExists | FailedResult> {
  const body = { modelId, trim };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/add-trim', options);
  const json = await response.json();
  return json;
}

export async function addVehicle(addVehicleParam: AddVehicleParam, initialStageParam: any): Promise<PostSuccess<DetailedVehicle> | PostExists | FailedResult> {
  const body = {
    addVehicleParam: JSON.stringify({ ...addVehicleParam, dateAdded: Date.now() }),
    initialStageParam: JSON.stringify(initialStageParam),
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/add', options);
  const json = await response.json();
  return json;
}

export async function updateVehicle(vehicleId: string, updateDoc: object): Promise<PatchSuccess<object, DetailedVehicle> | FailedResult> {
  const body = {
    vehicleId,
    updateDoc: JSON.stringify(updateDoc),
  };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/update', options);
  const json = await response.json();
  return json;
}

export async function sellVehicle(vehicleId: string, stageAssignmentId: string, dateSold: number): Promise<PatchSuccess<object, DetailedVehicle> | FailedResult> {
  const body = {
    vehicleId,
    stageAssignmentId,
    dateSold,
  };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/sell', options);
  const json = await response.json();
  return json;
}

export async function deleteVehicle(vehicleId: string): Promise<DeleteSuccess | FailedResult> {
  const body = { vehicleId };
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(vehicles + '/delete', options);
  const json = await response.json();
  return json;
}