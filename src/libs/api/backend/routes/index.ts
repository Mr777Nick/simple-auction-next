const rootUri = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const apiVersion = 'v1';
const apiBasePath = `${rootUri}/${apiVersion}`;

export const backendRoutes = {
  root: `${apiBasePath}/`,
  auth: {
    signIn: `${apiBasePath}/auth/signin`,
    signUp: `${apiBasePath}/auth/signup`,
  },
  users: {
    profile: `${apiBasePath}/users/profile`,
    topup: `${apiBasePath}/users/topup`,
  },
  items: {
    all: `${apiBasePath}/items`,
    ongoing: `${apiBasePath}/items/ongoing`,
    completed: `${apiBasePath}/items/completed`,
    my: `${apiBasePath}/items/my`,
    id: `${apiBasePath}/items/`,
  },
  itemBids: {
    all: `${apiBasePath}/item-bids`,
    my: `${apiBasePath}/item-bids/my`,
  },
};
