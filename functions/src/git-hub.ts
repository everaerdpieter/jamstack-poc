import * as functions from 'firebase-functions';
import * as path from 'path';
import { Octokit } from '@octokit/rest';
import { createHandlerWithDefaultMiddleware } from './on-call-middleware';

const owner = 'everaerdpieter';
const repo = 'jamstack-poc';
const gitHubAccessToken = functions.config().github.accesstoken;
const octokit = new Octokit({ auth: gitHubAccessToken });
const contentFolderPath = 'angular/src/assets/content';

export const getContent = createHandlerWithDefaultMiddleware(async (data, context) => {
  const contentFilePath = path.join(contentFolderPath, data.path);
  const response = await octokit.repos.getContents({
    owner,
    repo,
    path: contentFilePath,
  });
  const fileData: any = response.data;
  const content = Buffer.from(fileData.content, 'base64').toString();
  return content;
});

export const saveContent = createHandlerWithDefaultMiddleware(async (data, context) => {
  const contentFilePath = path.join(contentFolderPath, data.path);
  const response = await octokit.repos.getContents({
    owner,
    repo,
    path: contentFilePath,
  });
  const sha = (<any>response).data.sha;

  const message = '[Admin portal] Content update';
  const content = Buffer.from(data.content).toString('base64');
  await octokit.repos.createOrUpdateFile({ owner, repo, content, message, path: data.path, sha });
});
