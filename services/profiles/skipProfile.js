import {profileCheck, user} from '@/models';

const alreadySkipped = async (userId, targetUserId) => {
  const count = await profileCheck.count({
    where: {
      liked: false,
      userId: userId,
      targetId: targetUserId
    }
  });

  return count > 0;
};

export const skipProfile = async ({userId, targetUserId}) => {
  if (await alreadySkipped(userId, targetUserId)) {
    throw new Error('profile_already_skipped');
  }

  await profileCheck.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      targetUser: {
        connect: {
          id: targetUserId
        }
      },
      liked: false
    }
  });

  const targetUser = await user.findUnique({
    where: {
      id: targetUserId
    }
  });

  return {targetUser};
};
