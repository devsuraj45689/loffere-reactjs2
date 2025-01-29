import { userMappers } from './mappers';
import { DataEntities } from './dataEntities';

const mapperRegistry = {
  [DataEntities.USER]: {
    request: userMappers.getUserDetailRequestMapper,
    response: userMappers.getUserDetailResponseMapper,
  },
};

export default mapperRegistry;
