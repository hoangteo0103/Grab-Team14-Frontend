// @ts-nocheck
// @ts-ignore
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PaginationResponse, getHistoryJobListAPI, getJobDetailAPI, getJobListAPI } from '@app/api/jobs.api';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { setQuery } from './querySlice';
import { QueryModel } from '@app/domain/QueryModel';
import { getJobStatusAPI } from '@app/api/history.api';

export interface JobSlice {
  page: 1;
  limit: 10;
  search?: string;
  industry?: string;
  location?: string;
  experience?: string;
  type?: string;
  workingMode?: string;
}

const initialState: JobSlice = {
  page: 1,
  limit: 10,
  search: '',
  industry: '',
  location: '',
  experience: '',
  type: '',
  workingMode: '',
};

const initModel: QueryModel = {
  page: 1,
  limit: 10,
};

export interface QueryRequest {
  initialQuery: QueryModel;
  nowQuery: QueryModel | null;
}

export const getJobList = createAsyncThunk('job/getJobList', async (queryRequest: QueryRequest, { dispatch }) => {
  console.log('queryRequest', queryRequest);
  let query: QueryModel;
  query = queryRequest.initialQuery;

  return getJobListAPI(query!).then((res) => {
    return res;
  });
});

export const getJobDetail = createAsyncThunk('job/getJobDetail', async (id: string) => {
  return getJobDetailAPI(id).then((res) => {
    return res;
  });
});

export const getHistoryJobList = createAsyncThunk('job/getUserJobList', async () => {
  return getHistoryJobListAPI().then((res) => {
    return res;
  });
});

export const getJobStatus = createAsyncThunk('job/getJobStatus', async (id: string) => {
  return getJobStatusAPI(id).then((res) => {
    return res;
  });
});

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobList.fulfilled, (state, action) => {});
  },
});

export default jobSlice.reducer;
