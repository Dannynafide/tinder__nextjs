import {user} from '@/models';

export const updateProfile = async ({userId, payload}) =>
  user.update({
    where: {
      id: userId
    },
    data: {
      age: payload.age,
      sex: payload.sex,
      updatedAt: new Date()
    }
  });
