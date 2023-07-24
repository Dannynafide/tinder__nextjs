import onlyAuth from '@/middlewares/onlyAuth';
import {upsertFilter} from '@/services/filters/upsert';

const userFilterApi = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const payload = req.body;
        const filter = await upsertFilter({
          userId: req.currentUser.id,
          payload
        });

        res.status(200).json({filter});
      } catch (error) {
        res.status(422).json({filter: null, error});
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(userFilterApi);
