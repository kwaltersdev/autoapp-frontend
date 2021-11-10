export type GetRequestStatus = 'loading' | 'success' | 'failed' | '';
export type DeleteRequestStatus = GetRequestStatus;
export type PostRequestStatus = GetRequestStatus | 'exists';

