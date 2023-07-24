import {conversation} from '@/models';

export const getAll = ({userId}) =>
  conversation.findMany({
    where: {
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
    },
    orderBy: {
      id: 'desc'
    }
  });
