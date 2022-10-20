const { expect } = require("chai");
const sinon = require("sinon");
const { describe, it } = require("mocha")

const gitController = require("../src/controllers/git");
const gitFunctions = require("../src/controllers/gitFunctions");

describe('Git Controller Pull Tests', () => {
  it('Calls pull with correct null argument', async () => {
    const req = {
      body: {
        projectName: 'project name',
      }
    }
    const pullStub = sinon.stub(gitFunctions, 'pull');
    pullStub.returns('Collection/cell1.json | +2 -1');

    await gitController.gitPull(req, {}, () => { });

    expect(pullStub.calledWith(null)).to.be.true;

    pullStub.restore();
  });
  
  it('Calls pull with correct branch argument', async () => {
    const req = {
      body: {
        projectName: 'project name',
        branch: 'branch name'
      }
    }
    const pullStub = sinon.stub(gitFunctions, 'pull');
    pullStub.returns('Collection/cell1.json | +2 -1');

    await gitController.gitPull(req, {}, () => { });

    expect(pullStub.calledWith('branch name')).to.be.true;

    pullStub.restore();
  });
});

describe('Git Controller Commit Tests', () => {
  it('Throws error if no commit message', async () => {
    const req = {
      body: {
        commitMessage: null,
      }
    }

    const result = await gitController.gitCommit.bind(req, {}, () => { });

    expect(result).to.throw;
  });

  it('Calls commit with correct commit argument', async () => {
    const req = {
      body: {
        commitMessage: 'commit message'
      }
    }
    const commitStub = sinon.stub(gitFunctions, 'commit');

    await gitController.gitCommit(req, {}, () => { });

    expect(commitStub.calledWith('commit message')).to.be.true;

    commitStub.restore();
  });
});

describe('Git Controller Push Tests', () => {
  it('Calls push function with correct null arguments', async () => {
    const req = {
      body: {
      }
    }

    const pushStub = sinon.stub(gitFunctions, 'push');

    await gitController.gitPush(req, {}, () => { });

    expect(pushStub.called).to.be.true;
    expect(pushStub.calledWith({ remoteAddress: null, branch: null })).to.be.true;

    pushStub.restore();
  });
 
  it('Calls push function with correct arguments', async () => {
    const req = {
      body: {
        remoteAddress: 'remote git address',
        branch: 'git branch name'
      }
    }

    const pushStub = sinon.stub(gitFunctions, 'push');

    await gitController.gitPush(req, {}, () => { });

    expect(pushStub.called).to.be.true;
    expect(pushStub.calledWith({ remoteAddress: 'remote git address', branch: 'git branch name' })).to.be.true;

    pushStub.restore();
  });
});