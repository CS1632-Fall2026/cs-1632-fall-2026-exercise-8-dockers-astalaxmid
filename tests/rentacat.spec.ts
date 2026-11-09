import { test, expect } from '@playwright/test';

// TODO: Fill in with test cases.
const BASE_URL = 'http://localhost:8080';

test('TEST-1-RESET', async ({ page}) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => {
        document.cookie = '1=true';
        document.cookie = '2=true';
        document.cookie = '3=true';
      });
      await page.getByRole('link', { name: 'Reset'}).click();
      const catListing = page.getByText('Cats available for rent:').locator('..').getByRole('listitem');
      await expect(catListing.nth(0)).toHaveText('ID 1. Jennyanydots');
      await expect(catListing.nth(1)).toHaveText('ID 2. Old Deuteronomy');
      await expect(catListing.nth(2)).toHaveText('ID 3. Mistoffelees');


    
  });

test('TEST-2-CATALOG', async ({page}) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Catalog' }).click();
    const catPhotos = page.locator('li img');
    await expect(catPhotos.nth(1)).toHaveAttribute('src', '/images/cat2.jpg');
}); 

test('TEST-3-LISTING', async ({page}) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Catalog' }).click();
    const catListing = page.getByText('Cats available for rent:').locator('..').getByRole('listitem').filter({ hasNot: page.locator('img') });
    await expect(catListing).toHaveCount(3);
    await expect(catListing.nth(2)).toHaveText('ID 3. Mistoffelees');


    
  });

test('TEST-4-RENT-A-CAT', async ({page}) => {
  await page.goto('http://localhost:8080');
  await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
  await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Return' })).toBeVisible();
});

test('TEST-5-RENT', async ({page}) => {
  await page.goto('http://localhost:8080');
  await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
  await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).click();
  await page.getByRole('textbox', { name: 'Enter the ID of the cat to rent:' }).fill('1');
  await page.getByRole('button', { name: 'Rent' }).click();
  const catListing = page.getByText('Cats available for rent:').locator('..').getByRole('listitem');
  await expect(catListing.nth(0)).toHaveText('Rented out');
  await expect(catListing.nth(1)).toHaveText('ID 2. Old Deuteronomy');
  await expect(catListing.nth(2)).toHaveText('ID 3. Mistoffelees');

  await expect(page.locator('body')).toContainText('Success!');
});


test('TEST-6-RETURN', async ({page}) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => {
        document.cookie = '2=true';
        document.cookie = '3=true';
      });
      await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
      await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).click();
      await page.getByRole('textbox', { name: 'Enter the ID of the cat to return:' }).fill('2');
      await page.getByRole('button', { name: 'Return' }).click();
      await expect(page.locator('body')).toContainText('Success!');
      const catListing = page.getByText('Cats available for rent:').locator('..').getByRole('listitem');
      await expect(catListing.nth(0)).toHaveText('ID 1. Jennyanydots');
      await expect(catListing.nth(1)).toHaveText('ID 2. Old Deuteronomy');
      await expect(catListing.nth(2)).toHaveText('Rented out');
 
});

test('TEST-7-FEED-A-CAT', async ({ page}) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await expect(page.getByRole('button', { name: 'Feed' })).toBeVisible();
}); 

test('TEST-8-FEED', async ({ page}) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).click();
    await page.getByRole('textbox', { name: 'Number of catnips to feed:' }).fill('6');
    await page.getByRole('button', { name: 'Feed' }).click();
    await expect(page.locator('body')).toContainText('Nom, nom, nom.', { timeout: 20000 });
});

test('TEST-9-GREET-A-CAT', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();
    await expect(page.locator('body')).toContainText('Meow!Meow!Meow!');
});

test('TEST-10-GREET-A-CAT-WITH-NAME', async ({ page }) => {
    await page.goto(`${BASE_URL}/greet-a-cat/Jennyanydots`);
    await expect(page.locator('body')).toContainText('Meow! from Jennyanydots.');
});

test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page}) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => {
        document.cookie = '1=true';
        document.cookie = '2=true';
        document.cookie = '3=true';
      });
    
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await expect(page.locator('body')).toHaveScreenshot();

});




   

   
 