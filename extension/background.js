chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
            url: 'http://localhost:3000/getInfo',
            body: JSON.stringify(cookies),
            headers: {
              "Content-Type": "application/json",
              "mode": "cors"
          }
        };
        fetch('http://localhost:3000/getInfo', options)
            .then(response => response.json())
            .then(json => chrome.notifications.create('', {
              title: 'Course Compass',
              message: json,
              iconUrl: '/saber.png',
              type: 'basic'
            }))
            .catch(err => console.error(err));
            return response;
        })
      });
    });
  });
  return true;
});

