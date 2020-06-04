# Fetch GitLab deployments as git refs

GitLab stores each successful deployment as git ref in project repository.

Making them visible, is simple as fetch refs:

```
git fetch origin +refs/environments/*:refs/remotes/origin/environments/*
...
 * [new ref]         refs/environments/production-ee-adm-r4fujn/deployments/10 -> origin/environments/production-ee-adm-r4fujn/deployments/10
 * [new ref]         refs/environments/production-ee-fro-fc3ijj/deployments/11 -> origin/environments/production-ee-fro-fc3ijj/deployments/11
 * [new ref]         refs/environments/production-ee-xqj5u1/deployments/33     -> origin/environments/production-ee-xqj5u1/deployments/33
...
```

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
