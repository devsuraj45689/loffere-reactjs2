import { mapDataAsync } from '../../lib/utils';

export const getUserDetailRequestMapper = async (data: any) => {
  return mapDataAsync(data, async (p: any) => {
    return {
      userId: p.id,
    };
  });
}; // dummy request mappers

export const getUserDetailResponseMapper = async (data: any) => {
  return mapDataAsync(data, async (user: any) => {
    return {
      name: user.fName + user.lName,
      designation: user.designation_position,
    };
  });
}; // demo response mappers
