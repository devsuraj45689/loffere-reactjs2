// src/api/BaseService.ts
import Api from '../request';
import { AxiosProgressEvent } from 'axios';
import { DataEntities } from '../dataEntities';

class BaseService {
  // Centralized function to handle GET requests
  static getAll(entity: DataEntities) {
    return Api({
      url: `/${entity}`,
      method: 'get',
      entity,
    });
  }

  static getData(url: string, entity: DataEntities, data: any) {
    return Api({
      url: `${entity}/${url}`,
      method: 'post',
      entity,
      data,
    });
  }

  // Centralized function to handle GET request for an individual record by ID
  static getById(entity: DataEntities, id: number) {
    return Api({
      url: `/${entity}/${id}`,
      method: 'get',
      entity,
    });
  }

  // Centralized function to handle DELETE requests
  static deleteById(entity: DataEntities, id: number) {
    return Api({
      url: `/${entity}/${id}`,
      method: 'delete',
      entity,
    });
  }

  // Centralized function to handle POST requests (Create)
  static create(entity: DataEntities, data: any) {
    return Api({
      url: `/${entity}`,
      method: 'post',
      entity,
      data,
    });
  }

  // Centralized function to handle PUT requests (Update)
  static update(entity: DataEntities, id: number, data: any) {
    return Api({
      url: `/${entity}/${id}`,
      method: 'put',
      entity,
      data,
    });
  }

  static uploadFile(
    entity: DataEntities,
    file: File,
    onUploadProgress: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append('file', file);

    return Api({
      url: `/${entity}/upload`,
      method: 'post',
      entity,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onUploadProgress(progress);
        }
      },
    });
  }
}

export default BaseService;
