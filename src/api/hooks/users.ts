import { useQuery } from 'react-query';
import BaseService from '../services/BaseApiService';
import { DataEntities } from '../dataEntities';

export const useGetUsers = () => {
  return useQuery([DataEntities.USER], () =>
    BaseService.getAll(DataEntities.USER)
  );
};

export const useGetUserById = (id: number) => {
  return useQuery([DataEntities.USER, id], () =>
    BaseService.getById(DataEntities.USER, id)
  );
};

export const useDeleteUserById = (id: number) => {
  return useQuery([DataEntities.USER, id], () =>
    BaseService.deleteById(DataEntities.USER, id)
  );
};

export const useUpdateUserById = (id: number) => {
  return useQuery([DataEntities.USER, id], () =>
    BaseService.update(DataEntities.USER, id, {})
  );
};

export const useGetData = () => {
  return useQuery([DataEntities.USER], () =>
    BaseService.getData('it is url', DataEntities.USER, {})
  );
}; // this is for addtional url apart from crud
