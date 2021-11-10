// types
import { FailedResult, GetSuccess } from '../types/ServiceResults';
import { VehicleTurnStats, StageAssignmentStats, StageAssignmentStatsInclPercentile } from '../types/Statistics';

const statistics = 'http://localhost:7000/api/statistics';

export async function getVehicleTurnStats(): Promise<GetSuccess<VehicleTurnStats> | FailedResult> {
  const response = await fetch(statistics + '/vehicle-turn-statistics');
  const json = await response.json();
  return json;
};

export async function getStagesStatistics(): Promise<GetSuccess<StageAssignmentStats> | FailedResult> {
  const response = await fetch(statistics + '/stages-statistics');
  const json = await response.json();
  return json;
};

export async function getPeoplePlacesStatistics(): Promise<GetSuccess<StageAssignmentStatsInclPercentile> | FailedResult> {
  const response = await fetch(statistics + '/people-places-statistics');
  const json = await response.json();
  return json;
}