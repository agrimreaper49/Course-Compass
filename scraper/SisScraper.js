import puppeteer from 'puppeteer';

const uva_sis_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_RE.H_COURSE_LIST.FieldFormula.IScript_Main";
const uva_requirements_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/c/UV_SR_MENU.UV_AA_AAR_RQST.GBL";

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(uva_sis_link);

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  //testing for netbadge login
  await page.waitForNavigation();
  await page.waitForNavigation();

  const outerFrame = await page.waitForSelector('#main_iframe');

  const innerFrame = await outerFrame.contentFrame();

  const selector = await innerFrame.waitForSelector('#app > div > div > div > div:nth-child(2) > ul');

  const [listContainer] = await innerFrame.$$('#app > div > div > div > div:nth-child(2) > ul');

  const list = await listContainer.$$('li');

  console.log(list);

  for(const line of list) {
    let span = await line.$$('div > div > div.cx-MuiCardHeader-root > div > span > div > div.cx-MuiGrid-root.cx-MuiGrid-container.cx-MuiGrid-spacing-xs-1.cx-MuiGrid-item.cx-MuiGrid-align-items-xs-center.cx-MuiGrid-grid-xs-9.cx-MuiGrid-grid-sm-6 > div:nth-child(1) > p > span');
    span = span.pop();
    span = await span.getProperty("innerText");
    span = await span.jsonValue()
    console.log(span);
  }

  await browser.close();


})();

