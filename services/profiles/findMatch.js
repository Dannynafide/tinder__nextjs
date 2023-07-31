import {filter as filterModel, profileCheck, user} from '@/models';

const checkedIds = async (userId) => {
  const profiles = await profileCheck.findMany({
    where: {
      userId
    },
    select: {
      targetId: true
    }
  });

  return profiles.map((p) => p.targetId);
};

export const findMatch = async ({userId}) => {
  const filter = await filterModel.findUnique({
    where: {
      userId
    }
  });

  if (!filter) {
    return null;
  }

  const ids = await checkedIds(userId);
  const profile = await user.findFirst({
    where: {
      sex: filter.sex,
      age: {
        gte: filter.ageFrom ?? 1,
        lte: filter.ageUpTo ?? 1
      },
      NOT: {
        id: {in: [...ids, userId]}
      }
    }
  });

  return profile;
};
