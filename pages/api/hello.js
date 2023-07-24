import onlyAuth from 'middlewares/onlyAuth';
const helloApi = async (req, res) => {
  res.status(200).json({user: req.currentUser});
};

export default onlyAuth(helloApi);
