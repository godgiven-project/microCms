import { App } from '@godgiven/type-server';
import { authFunction } from './middleware/authentication-user.js';
import {
  pageHome,
  pageAddEntity,
  pageUpdateEntity,
  pageGetEntity,
  pageDeleteEntity,
  pageGetAllEntity
} from './page/index.js';

const app = new App();
app.port = 5001;
app.version = 'v1';
app.middlewareList.push(authFunction);

// 0. Index page
app.register('GET', '/', pageHome);
app.register('GET', '', pageHome);

// 4. Entity
app.register('POST', '/add', pageAddEntity);
app.register('POST', '/update', pageUpdateEntity);
app.register('POST', '/get', pageGetEntity);
app.register('POST', '/delete', pageDeleteEntity);
app.register('POST', '/get-all', pageGetAllEntity);

app.listen();
