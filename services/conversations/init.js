import {conversation} from '@/models';

export const initConversation = (userIds) =>
  conversation.create({
    data: {
      users: {
        create: userIds.map((id) => ({
          user: {
            connect: {
              id
            }
          }
        }))
      }
    }
  });
