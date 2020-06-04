/**
 * @author Elan Ruusamäe <glen@pld-linux.org>
 */

const { ini } = require('mrm-core');

async function task() {
  const comment = [
    `GitLab deployment git refs`,
    'To setup to use this config, invoke from shell:',
    '',
    'git config --add include.path $(git rev-parse --show-toplevel)/config/git-config.ini',
  ].join("\n# ");

  const aliases = {
    "\tdeploy-ref": `!git for-each-ref --sort=-creatordate --count=1 --format='%(refname)' refs/remotes/origin/environment/$1/*`,
  };

  refs = {
    "\tfetch": "+refs/environments/*:refs/remotes/origin/environment/*",
  };

  const config = ini('config/git-config.ini', comment);
  config.set('alias', aliases);
  config.set('remote "origin"', refs);
  config.save();
}

task.description = 'Setup git-config.ini for GitLab deployment refs';
module.exports = task;
