import {prisma} from '@/models';

export const upsertFilter = ({userId, payload}) =>
  prisma.filter.upsert({
    where: {
      userId
    },
    update: {
      sex: payload.sex,
      ageFrom: payload.ageFrom,
      ageUpTo: payload.ageUpTo,
      updatedAt: new Date()
    },
    create: {
      sex: payload.sex,
      ageFrom: payload.ageFrom,
      ageUpTo: payload.ageUpTo,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
