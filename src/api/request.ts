import axiosClient from './axiosClient';
import mapperRegistry from './mapperRegistery';
import { AxiosProgressEvent } from 'axios'; // Import AxiosProgressEvent
import { DataEntities } from './dataEntities';

type RequestOptions = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  params?: any;
  entity: DataEntities;
  headers?: Record<string, string>;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void; // Use AxiosProgressEvent here
};

const requestLib = async ({
  url,
  method,
  data,
  params,
  entity,
  headers,
  onUploadProgress,
}: RequestOptions) => {
  try {
    // Resolve transformers dynamically based on entity
    const entityMappers = mapperRegistry[entity || ''];
    const mappedReq = entityMappers?.request || ((d: any) => d);
    const mappedRes = entityMappers?.response || ((d: any) => d);

    // Transform request data
    const requestData = mappedReq(data);

    // Make the API call with optional progress callback for uploads
    const response = await axiosClient({
      url,
      method,
      data: requestData,
      params,
      headers,
      onUploadProgress, // Pass the progress handler
    });

    // Transform response data
    return mappedRes(response.data);
  } catch (error: any) {
    // Centralized error handling
    console.error(
      `[RequestLib Error] ${error.response?.status}: ${error.message}`
    );
    throw error.response?.data || error.message;
  }
};

export default requestLib;
