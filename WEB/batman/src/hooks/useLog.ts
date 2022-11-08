import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import API from "../api";

const api = new API();
const path = "logs";

export interface ILog {
  id: number;
  logDate: string;
  captureURL: string;
  result: string;
  resultURL: string;
  sectorId: number;
}

export interface ILogInWeek {
  result: {
    MONDAY: ILog[];
    TUESDAY: ILog[];
    WEDNESDAY: ILog[];
    THURSDAY: ILog[];
    FRIDAY: ILog[];
    SATURDAY: ILog[];
    SUNDAY: ILog[];
  };
}

const useLogInWeek = (options?: UseQueryOptions<ILogInWeek>) => {
  return useQuery({
    queryKey: [path],
    queryFn: () => api.get<ILogInWeek>(`${path}/inWeek`),
    ...options,
  });
};

export interface ILogs {
  page: number;
  pageSize: number;
  count: number;
  result: ILog[];
}

const useLogByStrip = (
  id: number,
  page: number = 1,
  size: number = 8,
  options?: UseQueryOptions<ILogs>
) => {
  return useQuery({
    queryKey: [path, id],
    queryFn: () =>
      api.get<ILogs>(
        `${path}/byStrip/${id}?page=${page}&size=${size}&sort=string`
      ),
    ...options,
  });
};

const useLogBySector = (
  id: number,
  page: number = 1,
  size: number = 10,
  options: UseQueryOptions<ILogs>
) => {
  return useQuery({
    queryKey: [path, id],
    queryFn: () =>
      api.get<ILogs>(
        `${path}/bySector/${id}?page=${page}&size=${size}&sort=string`
      ),
    ...options,
  });
};

export { useLogInWeek, useLogByStrip, useLogBySector };
