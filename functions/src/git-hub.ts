import * as functions from 'firebase-functions';
import { Octokit } from '@octokit/rest';

const gitHubAccesToken = functions.config().github.accestoken;
const octokit = new Octokit({ auth: gitHubAccesToken });
const owner = 'everaerdpieter';
const repo = 'update-github-poc';

export const getReadMe = functions.region('europe-west1').https.onCall(async (_, context) => {
  const response = await octokit.repos.getContents({
    owner,
    repo,
    path: 'README.md',
  });
  const data: any = response.data;
  const buffer = new Buffer(data.content, data.encoding);
  const content = buffer.toString('ascii');
  return content;
});
