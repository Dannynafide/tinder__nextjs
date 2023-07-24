import {conversationUser} from '@/models';

export const unreadCount = ({userId}) =>
  conversationUser.count({
    where: {
      userId,
      read: false
    }
  });
