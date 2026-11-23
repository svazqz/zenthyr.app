import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const REQUIRED_PAGES = ["index.html", "guides/getting-started/index.html", "introduction/index.html"];
const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const routes = readdirSync(dist, { recursive: true })
  .filter(path => path.endsWith('.html') && !path.endsWith('404.html') && !path.includes('/_astro/'))
  .sort()
  .map(path => path === 'index.html' ? './' : './' + path.replace(/(?:^|\/)index\.html$/, '/').replace(/^\/+/, ''));

test('build includes the required public pages', () => {
  for (const path of REQUIRED_PAGES) {
    expect(existsSync(join(dist, path)), path).toBe(true);
  }
  expect(routes.length).toBeGreaterThanOrEqual(REQUIRED_PAGES.length);
});

for (const route of routes) {
  test(`renders ${route} without a browser exception`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('body')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

console.log(`Browser route coverage scheduled: ${routes.length}/${routes.length} generated HTML routes`);

test('homepage links to the getting-started page under a deployment subpath', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Get started', exact: true }).click();
  await expect(page).toHaveURL(/\/coverage-site\/guides\/getting-started\/?$/);
  await expect(page.getByRole('heading', { name: 'Getting Started with Zenthyr', exact: true })).toBeVisible();
});
