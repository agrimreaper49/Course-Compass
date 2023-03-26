const chromium = require('chrome-aws-lambda');

const uva_sis_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_RE.H_COURSE_LIST.FieldFormula.IScript_Main";
const uva_advisor_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_AA.H_ADVISORS.FieldFormula.IScript_Main";

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

  const page = await browser.newPage();

  await page.goto(uva_sis_link);

  await page.setCookie(event.cookies);

  await page.waitForSelector('#nav > div.flex-fill.flex-column > div:nth-child(3) > button > div.d-flex.flex-grow-1.align-items-center > p');

  const student = await page.$('#nav > div.flex-fill.flex-column > div:nth-child(3) > button > div.d-flex.flex-grow-1.align-items-center > p');

  const studentName = await page.evaluate(el => el.textContent, student);

  const outerFrame = await page.waitForSelector('#main_iframe');

  const innerFrame = await outerFrame.contentFrame();

  await innerFrame.waitForSelector('#app > div > div > div > div:nth-child(2) > ul');

  const [listContainer] = await innerFrame.$$('#app > div > div > div > div:nth-child(2) > ul');

  const list = await listContainer.$$('li');

  const coursesTakenList = [];

  for(const line of list) {
    let span = await line.$$('div > div > div.cx-MuiCardHeader-root > div > span > div > div.cx-MuiGrid-root.cx-MuiGrid-container.cx-MuiGrid-spacing-xs-1.cx-MuiGrid-item.cx-MuiGrid-align-items-xs-center.cx-MuiGrid-grid-xs-9.cx-MuiGrid-grid-sm-6 > div:nth-child(1) > p > span');
    span = span.pop();
    span = await span.getProperty("innerText");
    span = await span.jsonValue();
    coursesTakenList.push(span);
  }

  //get major

  await page.goto(uva_advisor_link);

  let iframe = await page.waitForSelector('#main_iframe');

  let contentFrame = await iframe.contentFrame();

  await contentFrame.waitForSelector('xpath/html/body/div[1]/div/div/div/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/dl/div[3]/div/dd');

  await contentFrame.waitForSelector('xpath/html/body/div[1]/div/div/div/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/dl/div[2]/div/dd/a');

  const majorSelector = await contentFrame.$("xpath//html/body/div[1]/div/div/div/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/dl/div[3]/div/dd");

  const major = await contentFrame.evaluate(el => el.textContent, majorSelector);

  const emailSelector = await contentFrame.$('xpath/html/body/div[1]/div/div/div/div/div[2]/div/div[2]/div/div/div/div[2]/div/div/div/div/div/div/dl/div[2]/div/dd/a');

  const email = await contentFrame.evaluate(el => el.textContent, emailSelector);

  const studentInformation = {
    "name": studentName,
    "major": major,
    "advisorEmail": email,
    "courses": coursesTakenList
  }

    result = studentInformation;
  
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  

  return callback(null, result);
}