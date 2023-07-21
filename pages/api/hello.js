import {user} from 'models';

export default async function handler(req, res) {
  const allUsers = await user.findMany();

  res.status(200).json({allUsers});
}
