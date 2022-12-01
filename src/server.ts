import { App } from '@godgiven/type-server';
import { authFunction } from './middleware/authentication-user.js';
import {
  pageHome,
  pageRegister,
  pageGetVerifyCode,
  pageMakeVerifyCode,
  pageVerifyCode,
  pageGetUserData,
  pageVerifyToken,
  pageLogin,
  pageAddEntity,
  pageUpdateEntity,
  pageGetEntity
} from './page/index.js';

const app = new App();
app.port = 5001;
app.version = 'v1';
app.middlewareList.push(authFunction);

// 0. Index page
app.register('GET', '/', pageHome);
app.register('GET', '', pageHome);

// 1. Get verify code
app.register('POST', '/MakeVerifyCode', pageMakeVerifyCode);
app.register('POST', '/GetVerifyCode', pageGetVerifyCode);

// 2. Verify code and make token
app.register('POST', '/VerifyCode', pageVerifyCode);
app.register('POST', '/Login', pageLogin);

// 3. Register or get user Data
app.register('POST', '/Register', pageRegister);
app.register('POST', '/GetUserData', pageGetUserData);
app.register('POST', '/VerifyToken', pageVerifyToken);

// 4. Entity
app.register('POST', '/Entity/add', pageAddEntity);
app.register('POST', '/Entity/update', pageUpdateEntity);
app.register('POST', '/Entity/get', pageGetEntity);

app.listen();
