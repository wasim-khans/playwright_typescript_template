const { test, expect } = require('@playwright/test');
const { TokenManager } = require('./utils/tokenManager');

test('Customer views order history', async ({ browser }) => {
    const context = await browser.newContext();
    const token = await TokenManager.getToken('customer');

    await context.addInitScript((token) => {
        window.localStorage.setItem('token', token);
    }, token);

    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    expect(rows.count()).toBeGreaterThan(0);
});
