# Fetch GitLab deployments as git refs

A [mrm] task that adds [GitLab deployments git refs](#Fetch GitLab deployments as git refs).

[mrm]: https://mrm.js.org/

## What it does

- Creates `config/git-config.ini`.

## Usage

```
npm install -g mrm mrm-task-git-config-gitlab-deployments
mrm git-config-gitlab-deployments
```

## Authors and license

[Elan Ruusamäe](https://github.com/glensc)

MIT License, see the included [LICENSE](LICENSE) file.

## Fetch GitLab deployments as git refs

GitLab stores each successful deployment as [git ref in project repository][check-out-deployments-locally].

Making them visible, is simple as fetch refs:

```
git fetch origin +refs/environments/*:refs/remotes/origin/environments/*
...
 * [new ref]         refs/environments/production-ee-adm-r4fujn/deployments/10 -> origin/environments/production-ee-adm-r4fujn/deployments/10
 * [new ref]         refs/environments/production-ee-fro-fc3ijj/deployments/11 -> origin/environments/production-ee-fro-fc3ijj/deployments/11
 * [new ref]         refs/environments/production-ee-xqj5u1/deployments/33     -> origin/environments/production-ee-xqj5u1/deployments/33
...
```

[check-out-deployments-locally]: https://docs.gitlab.com/ee/ci/environments/#check-out-deployments-locally

However, the environment names are rather cryptic,
it's useful for project to setup nice mapping instead.

Create `config/git-config.ini`:

```ini

; invoke from shell:
; git config --add include.path $(git rev-parse --show-toplevel)/config/git-config.ini
[remote "origin"]
	fetch = +refs/environments/production-lv-78lzku/deployments/*:refs/remotes/origin/environment/production/lv/*
	fetch = +refs/environments/production-lt-c7huh2/deployments/*:refs/remotes/origin/environment/production/lt/*
	fetch = +refs/environments/production-ee-cv70fb/deployments/*:refs/remotes/origin/environment/production/ee/*
	fetch = +refs/environments/test-ee-30f7yr/deployments/*:refs/remotes/origin/environment/test/ee/*
	fetch = +refs/environments/test/pebbles/deployments/*:refs/remotes/origin/environment/test/ee/*
```

Make your git to use that config and fetch refs:

```
git config --add include.path $(git rev-parse --show-toplevel)/config/git-config.ini
git fetch
```

To cleanup the refs that were originally fetched:

```
git for-each-ref refs/remotes/origin/environments/ --format='%(refname)' | xargs -l1 git update-ref -d
```
