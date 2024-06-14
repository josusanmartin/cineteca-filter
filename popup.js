document.getElementById('filterButton').addEventListener('click', () => {
    const timeValue = document.getElementById('time').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: filterMovies,
        args: [timeValue]
      });
    });
  });
  
  function filterMovies(timeValue) {
    const [hours, minutes] = timeValue.split(':').map(Number);
    const timeLimit = new Date();
    timeLimit.setHours(hours, minutes, 0);
  
    const movieEntries = document.querySelectorAll('#cartelera .row .col-12, #cartelera .row .col-md-6, #cartelera .row .col-lg-4');
  
    movieEntries.forEach(entry => {
      const timeElements = entry.querySelectorAll('p a[href*="visSelectTickets"]');
      let hasLateShow = false;
  
      timeElements.forEach(timeElement => {
        const timeText = timeElement.textContent.trim();
        const [hour, minute] = timeText.split(':').map(Number);
        const showTime = new Date();
        showTime.setHours(hour, minute, 0);
  
        if (showTime >= timeLimit) {
          hasLateShow = true;
        }
      });
  
      if (!hasLateShow) {
        entry.style.display = 'none';
      }
    });
  }
  