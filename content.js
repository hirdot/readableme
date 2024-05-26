function extractReadmeInfo() {
  const readme = document.querySelector('#readme');
  if (!readme) return null;
  
  // Extract table of contents (if any)
  const toc = [];
  readme.querySelectorAll('h2, h3, h4').forEach(header => {
    toc.push({
      level: header.tagName,
      text: header.textContent,
      id: header.id
    });
  });
  
  // Extract summary (first paragraph)
  const summary = readme.querySelector('p')?.textContent || '';
  
  return { toc, summary };
}
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractReadmeInfo') {
    const info = extractReadmeInfo();
    sendResponse(info);
  }
});
