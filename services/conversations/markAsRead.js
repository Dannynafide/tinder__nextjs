import {conversationUser} from '@/models';

export const markAsRead = ({userId, conversationId}) =>
  conversationUser.updateMany({
    where: {
      conversationId,
      userId
    },
    data: {
      read: true
    }
  });
