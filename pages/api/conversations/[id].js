import onlyAuth from '@/middlewares/onlyAuth';
import {create} from '@/services/conversations/create';
import {get} from '@/services/conversations/get';

const conversationApi = async (req, res) => {
  const conversationId = Number(req.query.id);
  switch (req.method) {
    case 'POST': {
      try {
        const conversation = await create({
          ...req.body,
          userId: req.currentUser.id,
          conversationId: Number(req.query.id)
        });

        res.status(200).json({conversation});
      } catch (error) {
        res.status(422).json({conversation: null, error: error.message});
      }
      break;
    }

    case 'GET': {
      try {
        const conversation = await get({id: conversationId, userId: req.currentUser.id});
        if (!conversation) {
          throw Error('conversation_not_found');
        }
        res.status(200).json({conversation});
      } catch (error) {
        res.status(422).json({conversation: null, error: error.message});
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi);
