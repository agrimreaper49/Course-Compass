require("dotenv").config();
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
var cors = require('cors')
app.use(cors())

const { ChatGPT } = require('chatgpt-wrapper')

app.post("/getInfo", async (req, res, next) => {
  console.log("Get info endpoint was hit!")

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

const uva_sis_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_RE.H_COURSE_LIST.FieldFormula.IScript_Main";
const uva_advisor_link = "https://sisuva.admin.virginia.edu/psp/ihprd/UVSS/SA/s/WEBLIB_HCX_AA.H_ADVISORS.FieldFormula.IScript_Main";

  const page = await browser.newPage();

  await page.goto(uva_sis_link);

  const cookies = req.body;

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
    "courses": coursesTakenList,
    "response": ""
  }

  console.log(studentInformation)

  await browser.close();
  
  const prompt = `I'm a ${studentInformation.major} major at UVA and I've taken these courses: ${studentInformation.courses}. To puruse a ${studentInformation.major} degree at UVA, what classes should I take next? Please give your response as a list of only course codes.`

    const chat = new ChatGPT({
    API_KEY: "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"
    });

    try {
      const answer = await chat.send(prompt);
      console.log(answer.choices[0].message.content)
      res.send(JSON.stringify(answer.choices[0].message.content));
    } catch (err) {
      console.log(err);
    }

});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
