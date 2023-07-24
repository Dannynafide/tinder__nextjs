import axios from 'axios';

const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiRoutes = {
  profiles: {
    like: (payload) => httpClient.post('/api/profiles', payload),
    skip: (payload) => httpClient({url: '/api/profiles', data: payload, method: 'DELETE'})
  },
  user: {
    filter: {
      update: (payload) => httpClient.put('/api/user/filter', payload)
    },
    profile: {
      get: () => httpClient.get('/api/user/profile')
    }
  }
};

export default apiRoutes;
