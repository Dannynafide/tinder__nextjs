import onlyAuth from '@/middlewares/onlyAuth';
import {findMatch} from '@/services/profiles/findMatch';
import {likeProfile} from '@/services/profiles/likeProfile';
import {skipProfile} from '@/services/profiles/skipProfile';

const profilesApi = async (req, res) => {
  const userId = req.currentUser.id;
  switch (req.method) {
    case 'GET': {
      try {
        const profile = await findMatch({userId});

        res.status(200).json({profile});
      } catch (error) {
        res.status(422).json({profile: null, error});
      }
      break;
    }

    case 'POST': {
      try {
        const {targetUserId} = req.body;
        const {hasMatch, targetUser} = await likeProfile({
          userId,
          targetUserId: String(targetUserId)
        });

        const nextProfile = await findMatch({userId});

        res.status(200).json({hasMatch, targetUser, nextProfile});
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json({hasMatch: false, targetUser: null, error: error.message});
      }
      break;
    }

    case 'DELETE': {
      try {
        const {targetUserId} = req.body;
        const {targetUser} = await skipProfile({
          userId,
          targetUserId: String(targetUserId)
        });

        const nextProfile = await findMatch({userId});

        res.status(200).json({targetUser, nextProfile});
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json({targetUser: null, error: error.message});
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(profilesApi);
