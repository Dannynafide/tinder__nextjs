import {skill} from '@/models';

const getAll = () => {
  return skill.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });
};

export default getAll;
