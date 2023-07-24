import {conversation} from '@/models';
import {markAsRead} from './markAsRead';

export const get = async ({id, userId}) => {
  await markAsRead({conversationId: id, userId});

  return conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId
        }
      }
    },
    include: {
      users: {
        include: {
          user: true
        }
      },
      messages: {
        include: {
          user: true
        }
      }
    }
  });
};
