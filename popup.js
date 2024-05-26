document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractReadmeInfo' }, (response) => {
      if (response) {
        document.getElementById('summary-content').textContent = response.summary;

        const tocList = document.getElementById('toc-list');
        response.toc.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item.text;
          tocList.appendChild(listItem);
        });
      }
    });
  });
});
