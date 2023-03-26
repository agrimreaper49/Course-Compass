const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

const uva_sis_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_RE.H_COURSE_LIST.FieldFormula.IScript_Main";
const uva_advisor_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_AA.H_ADVISORS.FieldFormula.IScript_Main";

  const page = await browser.newPage();

  await page.goto(uva_sis_link);

  let cookies = [
    {
      "name": "_ga_6VZF5L69Q3",
      "value": "GS1.1.1660930907.1.0.1660930907.0.0.0",
      "domain": ".virginia.edu",
      "path": "/",
      "expires": 1695490907.162029,
      "httpOnly": false,
      "secure": false
    },
    {
      "name": "_ga",
      "value": "GA1.2.1868544737.1660930907",
      "domain": ".virginia.edu",
      "path": "/",
      "expires": 1695491076.983101,
      "httpOnly": false,
      "secure": false
    },
    {
      "name": "BIGipServer~EA-SIS~SIS-18200-18210-18220",
      "value": "rd2o00000000000000000000ffff0a011666o18210",
      "domain": "sisuva.admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true
    },
    {
      "name": "springboard",
      "value": "%7B%22UVA01%22%3A%7B%22persona%22%3A%22HPT_STUDENT%22%2C%22tileExclusions%22%3A%7B%7D%7D%7D",
      "domain": "sisuva.admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": false,
      "secure": false
    },
    {
      "name": "hpt_institution",
      "value": "UVA01",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "lcsrftoken",
      "value": "K1uS90vgKxmLkAh4dsS4q2xpv9Fcu3rS11isEhfBLsE=",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "spwp2-18210-PORTAL-PSJSESSIONID",
      "value": "-D4cQM11ZR__s71JmJsntiarU3T56Zg_!1269262944!1679806221685",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true
    },
    {
      "name": "PS_LASTSITE",
      "value": "https://sisuva.admin.virginia.edu/psp/ihprd/",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "https%3a%2f%2fsisuva.admin.virginia.edu%2fpsp%2fihprd%2fuvss%2fsa%2frefresh",
      "value": "list: %3ftab%3dpapp_guest|%3frp%3dpapp_guest|%3ftab%3dremoteunifieddashboard|%3frp%3dremoteunifieddashboard|%3ftab%3ddefault|%3frp%3ddefault|%3ftab%3dhpt_student_general_tab|%3frp%3dhpt_student_general_tab|%3ftab%3dhpt_student_academics_tab|%3frp%3dhpt_student_academics_tab|%3ftab%3dhpt_student_financials_tab|%3frp%3dhpt_student_financials_tab|%3ftab%3duv_student|%3frp%3duv_student|%3ftab%3duva_stdnt_info_upd_link|%3frp%3duva_stdnt_info_upd_link|%3ftab%3duv_cc_not_return|%3frp%3duv_cc_not_return",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": 1679807421.949216,
      "httpOnly": false,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "ExpirePage",
      "value": "https://sisuva.admin.virginia.edu/psp/ihprd/",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "PS_TokenSite",
      "value": "https://sisuva.admin.virginia.edu/psp/ihprd/?spwp2-18210-PORTAL-PSJSESSIONID",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "PS_LOGINLIST",
      "value": "https://sisuva.admin.virginia.edu/ihprd",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": false,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "SignOnDefault",
      "value": "",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "PS_TOKEN",
      "value": "AAAAqwECAwQAAQAAAAACvAAAAAAAAAAsAARTaGRyAgBOeQgAOAAuADEAMBS17BHfAhEtHFTzme5sypeZRX7cYgAAAGsABVNkYXRhX3icHcc7DkBQFITh/yIqK7AHwvWuPSsR9CqNTiWszeKc6yTzzRzgVpbtoJCzXqPHxc5JxcHj0jLS+0wsdKxsDMxiLf8kq0nRRJKEQNqoyX4jQllGTSzmlH9KCj5oMQ4P",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "PS_DEVICEFEATURES",
      "value": "width:1512 height:982 pixelratio:2 touch:0 geolocation:1 websockets:1 webworkers:1 datepicker:1 dtpicker:1 timepicker:1 dnd:1 sessionstorage:1 localstorage:1 history:1 canvas:1 svg:1 postmessage:1 hc:0 maf:0",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": 1714366222.632563,
      "httpOnly": false,
      "secure": true,
      "sameSite": "Strict"
    },
    {
      "name": "TS01e7d578",
      "value": "0162f8d786f83b2fff40a247473877f3c93b1be3c8c9cb978a8c5949ae692469353e6ba74d86d6e13fbee99776f3a0b0d5a870be18",
      "domain": ".sisuva.admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": false,
      "secure": false
    },
    {
      "name": "CSRFCookie",
      "value": "0cb9b1bb-edac-48d5-b0f2-9e2df21fbec3",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": false,
      "secure": false
    },
    {
      "name": "PS_TOKENEXPIRE",
      "value": "26_Mar_2023_05:05:38_GMT",
      "domain": ".admin.virginia.edu",
      "path": "/",
      "expires": -1,
      "httpOnly": false,
      "secure": true,
      "sameSite": "Strict"
    }
  ]

  for (let i = 0; i < cookies.length; i++) {
  await page.setCookie(cookies[i]);
  }

  await page.goto(uva_sis_link);

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

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

  console.log(studentInformation);

  res.json(studentInformation);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
