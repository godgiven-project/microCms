import { ServerResponse } from 'http';
import { requestType } from '../../middleware/authentication-user';
import { sendResponse, bodyParser } from '@godgiven/type-server';
import { Database } from '@godgiven/database/json-file.js';
import { config } from '../../config.js';

const ssoTable = new Database({
  name: 'entity',
  path: config.databasePath
});

export const pageGetAllEntity = async (request: requestType, response: ServerResponse): Promise<void> =>
{
  const params = await bodyParser(request);
  const errorList = [];

  if (params == null)
  {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end();
  }

  if (params.entity == null)
  {
    errorList.push('SendEntity');
  }

  if (errorList.length > 0)
  {
    sendResponse(response, 200, {
      ok: false,
      description: 'error',
      data: {
        errorList
      }
    });
    return;
  }

  try
  {
    const data = await ssoTable.findAll(params.entity);
    sendResponse(response, 200, {
      ok: true,
      description: 'DataWasRead',
      data
    });
  }
  catch (error)
  {
    errorList.push((error as Error).message);
    sendResponse(response, 200, {
      ok: false,
      description: 'error',
      data: {
        errorList
      }
    });
  }
};
