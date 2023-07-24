import {timezone} from '@/models';

const getAll = () => {
  return timezone.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      id: 'asc'
    }
  });
};

export default getAll;
