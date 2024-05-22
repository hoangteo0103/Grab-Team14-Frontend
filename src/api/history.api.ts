// @ts-nocheck
// @ts-ignore
import { httpApi } from '@app/api/http.api';

export interface UpdateStatusRequest {
  status: string;
}

export const updateJobStatus = async (id: string, updateStatusRequest: UpdateStatusRequest) =>
  httpApi.post(`/userJob/${id}/update-status`, updateStatusRequest);

export const getJobStatusAPI = async (id: string) => {
  try {
    const response = await httpApi.get(`/userJob/${id}/status`);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
