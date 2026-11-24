@AGENTS.md

## Git workflow

- Work on `dev`. Never commit or push directly to `main`: it only receives changes through a pull request from `dev`, merged with a merge commit.
- Before any commit, push or pull request, load the `git-commit-push` skill and follow it.
- Commit messages, PR titles and PR bodies are in English, using Conventional Commits.
- Verify each commit block with `pnpm build` before the next one, and again on the final state before opening a PR.
- Do not merge pull requests, force-push, use `--no-verify`, or change rulesets or branch protection. The user does those in GitHub.
- Changes to CI workflows or bot configuration go in their own pull request, and the user is told first.
