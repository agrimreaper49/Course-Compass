const button = document.createElement('button');
button.textContent = 'Course Compass'
document.body.insertAdjacentElement('afterbegin', button);

button.addEventListener('click', () => {
  chrome.runtime.sendMessage('', (res) => {
      console.log(res);
  });
});
