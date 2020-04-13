import * as functions from 'firebase-functions';

export const saveText = functions.https.onCall((data, context) => {
  const NodeGit = require('nodegit');
  const GITHUB_TOKEN = 'TODO_GET_FROM_GITHUB';
  const cloneUrl = 'https://github.com/everaerdpieter/update-github-poc.git';
  const localPath = require('path').join(__dirname, 'tmp');
  const cloneOptions: any = {};
  cloneOptions.fetchOpts = {
    callbacks: {
      certificateCheck: function () {
        return 0;
      },
      credentials: function () {
        return NodeGit.Cred.userpassPlaintextNew(GITHUB_TOKEN, 'x-oauth-basic');
      },
    },
  };
  const cloneRepository = NodeGit.Clone(cloneUrl, localPath, cloneOptions);
  const errorAndAttemptOpen = function () {
    return NodeGit.Repository.open(localPath);
  };
  const promise = cloneRepository.catch(errorAndAttemptOpen).then(function (repository: any) {
    // Access any repository methods here.
    console.log('Is the repository bare? %s', Boolean(repository.isBare()));
  });

  const getMostRecentCommit = function (repository: any) {
    return repository.getBranchCommit('master');
  };

  const getCommitMessage = function (commit: any) {
    return commit.message();
  };

  return promise
    .then((a: any) => {
      return NodeGit.Repository.open(localPath)
        .then(getMostRecentCommit)
        .then(getCommitMessage)
        .then(function (message: any) {
          console.log('Laatste commit:', message);
          return 'Gelukt';
        });
    })
    .catch((e: any) => {
      console.log('Error', e);
      return 'Mis mis mis!!!';
    });
});
