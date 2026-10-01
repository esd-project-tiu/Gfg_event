const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const baseURL = process.env.DEVFIX_URL || 'http://127.0.0.1:4173/index.html';

test('DEVFIX recognizes its built-in error examples and validates empty input', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.goto(baseURL);

    const examples = [
      ['JS undefined property', 'js-undefined-prop'],
      ['Python NameError', 'py-name'],
      ['Python ZeroDivisionError', 'py-zero-division'],
      ['Java NullPointerException', 'java-npe'],
      ['C++ segfault', 'cpp-segfault'],
    ];

    for (const [label, expectedRule] of examples) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await page.getByRole('button', { name: 'Analyze error' }).click();
      await page.locator(`#results .badge.rule`).waitFor();
      assert.equal(
        (await page.locator('#results .badge.rule').textContent()).trim(),
        `rule: ${expectedRule}`,
        `${label} should match ${expectedRule}`
      );
      assert.equal(await page.locator('#results article.result.known').count(), 1);
    }

    await page.getByRole('button', { name: 'Clear', exact: true }).click();
    await page.getByRole('button', { name: 'Analyze error' }).click();
    assert.equal(await page.locator('#error-input').getAttribute('aria-invalid'), 'true');
    assert.match(await page.locator('#error-msg').textContent(), /Paste an error message first/);
    assert.deepEqual(pageErrors, [], 'the page should not throw browser-side JavaScript errors');
  } finally {
    await browser.close();
  }
});
