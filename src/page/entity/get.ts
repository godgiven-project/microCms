import { ServerResponse } from 'http';
import { requestType } from '../../middleware/authentication-user';
import { sendResponse, bodyParser } from '@godgiven/type-server';
import { Database } from '@godgiven/database/json-file.js';
import { config } from '../../config.js';

const ssoTable = new Database({
  name: 'entity',
  path: config.databasePath
});

export const pageGetEntity = async (request: requestType, response: ServerResponse): Promise<void> =>
{
  const params = await bodyParser(request);
  const errorList = [];

  if (params == null)
  {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end();
  }

  if (params.key == null)
  {
    errorList.push('keyIsNotExsist');
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
    const user = await ssoTable.findById(
      'crm',
      params.key as string
    );
    sendResponse(response, 200, {
      ok: true,
      description: `Profile user ${params.key as string}`,
      data: user
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
