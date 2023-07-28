import useSWR from 'swr';
import apiRoutes from 'utils/apiRoutes';

const QuantityUnreadMessages = ({isLoggedIn = false}) => {
  const {data, loading} = useSWR(isLoggedIn ? `/api/conversations` : null, apiRoutes.fetcher);

  return <span>{!loading && data?.unread > 0 && ` (${data.unread})`}</span>;
};

export default QuantityUnreadMessages;
