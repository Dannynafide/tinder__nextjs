import {user} from '@/models';

export const updateProfile = async ({userId, payload}) =>
  user.update({
    where: {
      id: userId
    },
    data: {
      skill: payload.skill,
      timezone: payload.timezone,
      updatedAt: new Date()
    }
  });
