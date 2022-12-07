import { ServerResponse } from 'http';
import { requestType } from '../../middleware/authentication-user';
import { sendResponse, bodyParser } from '@godgiven/type-server';
import { Database } from '@godgiven/database/json-file.js';
import { config } from '../../config.js';

const ssoTable = new Database({
  name: 'entity',
  path: config.databasePath
});

export const pageDeleteEntity = async (request: requestType, response: ServerResponse): Promise<void> =>
{
  const params = await bodyParser(request);
  const errorList: string[] = [];

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
    await ssoTable.deleteById(
      'crm',
      params.key
    );
    sendResponse(response, 200, {
      ok: true,
      description: `Entity ${params.key as string} Deleted`
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
