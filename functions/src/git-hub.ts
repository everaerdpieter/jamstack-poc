import * as functions from 'firebase-functions';
import { Octokit } from '@octokit/rest';
import { createHandlerWithDefaultMiddleware } from './on-call-middleware';

const gitHubAccesToken = functions.config().github.accestoken;
const octokit = new Octokit({ auth: gitHubAccesToken });
const owner = 'everaerdpieter';
const repo = 'update-github-poc';

const readMePath = 'README.md';

export const getReadMe = createHandlerWithDefaultMiddleware(async (_, context) => {
  const response = await octokit.repos.getContents({
    owner,
    repo,
    path: readMePath,
  });
  const data: any = response.data;
  const content = Buffer.from(data.content, 'base64').toString();
  return content;
});

export const saveReadMe = createHandlerWithDefaultMiddleware(async (data, context) => {
  const response = await octokit.repos.getContents({
    owner,
    repo,
    path: readMePath,
  });
  const sha = (<any>response).data.sha;

  const message = 'Update via firebase function';
  const content = Buffer.from(data).toString('base64');
  await octokit.repos.createOrUpdateFile({ owner, repo, content, message, path: readMePath, sha });
  return;
});
