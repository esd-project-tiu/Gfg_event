# DEVFIX GitHub Actions browser test

This bundle checks the five built-in error examples in `index.html` and verifies that submitting an empty error displays validation. It runs the real page in Chromium through Playwright.

## Add these files to your repository

1. Put the app HTML at the repository root as `index.html`.
2. Put `devfix.test.cjs` under `tests/devfix.test.cjs`.
3. Put `tests.yml` under `.github/workflows/tests.yml`.

The workflow runs on pushes, pull requests, and manual dispatch. It requires Node.js 20, Python 3, and GitHub-hosted Ubuntu (provided by the runner).

If your HTML uses a different filename or directory, update `DEVFIX_URL` in `tests.yml`. The test expects the app's existing selectors and sample names.
