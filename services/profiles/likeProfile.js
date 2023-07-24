import {profileCheck, user} from '@/models';
import {initConversation} from '@/services/conversations/init';

const checkIfMatchExists = async (userId, targetUserId) => {
  const count = await profileCheck.count({
    where: {
      liked: true,
      userId: targetUserId,
      targetId: userId
    }
  });

  return count > 0;
};

const alreadyLiked = async (userId, targetUserId) => {
  const count = await profileCheck.count({
    where: {
      liked: true,
      userId: userId,
      targetId: targetUserId
    }
  });

  return count > 0;
};

export const likeProfile = async ({userId, targetUserId}) => {
  if (await alreadyLiked(userId, targetUserId)) {
    throw new Error('profile_already_liked');
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
      liked: true
    }
  });

  const hasMatch = await checkIfMatchExists(userId, targetUserId);
  if (hasMatch) {
    await initConversation([userId, targetUserId]);
  }

  const targetUser = await user.findUnique({
    where: {
      id: targetUserId
    }
  });

  return {hasMatch, targetUser};
};
