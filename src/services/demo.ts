// types
import { FailedResult, DeleteSuccess, GetSuccess, SuccessResult } from "../types/ServiceResults";
import { DbSelection, Defaults } from '../types/Demo';

const demo = 'http://localhost:7000/api/demo';

export async function selectDatabase(dbSelection: DbSelection): Promise<SuccessResult | FailedResult> {
  // const dbSelectionJSON = JSON.stringify(dbSelection);
  const body = { dbSelection };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch('http://localhost:7001/api/demo/select-db', options);
  const json = await response.json();
  return json;
}

// gets the default stage assignment, i.e. 'stage: Assign, personPlace: Inventory Manager'
export async function getDefaults(): Promise<GetSuccess<Defaults> | FailedResult> {
  const response = await fetch(demo + '/get-defaults');
  const json = await response.json();
  return json;
};

export async function clearDatabase(): Promise<DeleteSuccess | FailedResult> {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(demo + '/clear-database', options);
  const json = await response.json();
  return json;
};

export async function addVehicleDescriptors(): Promise<SuccessResult | FailedResult> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(demo + '/add-vehicle-descriptors', options);
  const json = await response.json();
  return json;
};

export async function addStages(): Promise<SuccessResult | FailedResult> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(demo + '/add-stages', options);
  const json = await response.json();
  return json;
};

export async function generateVehicles(vehicleAmount: string, months: string): Promise<SuccessResult | FailedResult> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(demo + `/generate-vehicles/${vehicleAmount}/${months}`, options);
  const json = await response.json();
  return json;
}