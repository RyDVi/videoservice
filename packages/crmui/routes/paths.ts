import { path } from 'static-path';

const root = path('/');
const crmRoot = root.path('/crm');

const home = crmRoot.path('/home');

const films = crmRoot.path('/films');
const film = films.path('/:filmId');
const filmCreate = films.path('/create');

const videoRoot = film.path('/video');
const videoCreate = videoRoot.path('/create');
const video = videoRoot.path('/:videoId');

const customers = crmRoot.path('/customers');
const customer = customers.path('/:customerId');

const settings = crmRoot.path('/settings');

const logout = crmRoot.path('/logout');
const login = crmRoot.path('/login');

const paths = {
  crmRoot,
  home,
  films,
  film,
  filmCreate,
  customers,
  customer,
  settings,
  logout,
  login,
  video,
  videoCreate,
};
export default paths;
