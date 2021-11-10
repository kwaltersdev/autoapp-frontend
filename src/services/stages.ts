// types
import { IdName } from '../types/misc';
import { GetSuccess, PostSuccess, PostExists, FailedResult, PatchSuccess, PatchManyResult } from '../types/ServiceResults';
import { StageAssignment, AssignStageParam, CurrentStageSummary } from '../types/StageAssignment';
import { DetailedVehicle } from '../types/Vehicle';
import { StageVehicleCount, PersonPlaceVehicleCount, StageSummary, UpdatedStageOrder } from '../types/Stage';

const stages = 'http://localhost:7000/api/stages';

export async function getStageVehicleCounts(): Promise<GetSuccess<StageVehicleCount[]> | FailedResult> {
  const response = await fetch(stages + '/get-stage-vehicle-counts');
  const json = await response.json();
  return json;
}

export async function getPersonPlaceVehicleCounts(): Promise<GetSuccess<PersonPlaceVehicleCount[]> | FailedResult> {
  const response = await fetch(stages + '/get-person-place-vehicle-counts');
  const json = await response.json();
  return json;
}

export async function getStages(): Promise<GetSuccess<StageSummary[]> | FailedResult> {
  const response = await fetch(stages + '/get-stages');
  const json = await response.json();
  return json;
};

export async function addStage(stage: string): Promise<PostSuccess<StageSummary, StageSummary[]> | PostExists | FailedResult> {
  const body = { stage };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(stages + '/add-stage', options);
  const json = await response.json();
  return json;
};

export async function getPeoplePlaces(stageId: string): Promise<GetSuccess<IdName[]> | FailedResult> {
  const response = await fetch(`${stages}/get-people-places?stageId=${stageId}`);
  const json = await response.json();
  return json;
};

export async function getAllPeoplePlaces(): Promise<GetSuccess<IdName[]> | FailedResult> {
  const response = await fetch(stages + '/get-all-people-places');
  const json = await response.json();
  return json;
};

type AddPersonPlaceReturn = PostSuccess<IdName, { peoplePlaces: IdName[] | undefined, allPeoplePlaces: IdName[]; }> | PostExists | FailedResult;
export async function addPersonPlace(stageId: string, personPlace: string): Promise<AddPersonPlaceReturn> {
  const body = { stageId, personPlace };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(stages + '/add-person-place', options);
  const json = await response.json();
  return json;
};

export async function assignStage(assignStageParam: AssignStageParam, previousStage?: CurrentStageSummary): Promise<PostSuccess<DetailedVehicle> | FailedResult> {
  const body = {
    assignStageParam: JSON.stringify(assignStageParam),
    previousStage: previousStage && JSON.stringify(previousStage)
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(stages + '/assign-stage', options);
  const json = await response.json();
  return json;
};

export async function completeStageAssignment(stageAssignmentId: string, dateCompleted: number): Promise<PatchSuccess<object, StageAssignment, DetailedVehicle> | FailedResult> {
  const body = {
    stageAssignmentId,
    dateCompleted,
  };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(stages + '/complete-stage-assignment', options);
  const json = await response.json();
  return json;
};

export async function getStageHistory(vehicleId: string): Promise<GetSuccess<StageAssignment[]> | FailedResult> {
  const response = await fetch(`${stages}/stage-history?vehicleId=${vehicleId}`);
  const json = await response.json();
  return json;
}

export async function updateStageOrder(newStageOrder: UpdatedStageOrder[]): Promise<PatchManyResult<StageSummary[]> | FailedResult> {
  const body = {
    updates: newStageOrder,
  };
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const response = await fetch(stages + '/update-stage-order', options);
  const json = await response.json();
  return json;
}