import {prisma} from '@/models';

export const upsertFilter = ({userId, payload}) =>
  prisma.filter.upsert({
    where: {
      userId
    },
    update: {
      skill: payload.skill,
      timezone: payload.timezone,
      updatedAt: new Date()
    },
    create: {
      skill: payload.skill,
      timezone: payload.timezone,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
