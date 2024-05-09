// public/script.js

document.getElementById('jsonForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const jsonData = document.getElementById('json').value;
    const webhookUrl = document.getElementById('webhook').value;
  
    try {
      // Send JSON data to backend
      const response = await fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ json: jsonData, webhook: webhookUrl })
      });
  
      const result = await response.text();
      console.log(result);
  
      // Show result page and hide form page
      document.getElementById('formPage').style.display = 'none';
      document.getElementById('resultPage').style.display = 'block';
      document.getElementById('result').innerText = result;
    } catch (error) {
      console.error('Error sending JSON data:', error.message);
    }
  });
  
  document.getElementById('multiSubmit').addEventListener('click', async () => {
    const jsonData = document.getElementById('json').value;
    const webhookUrl = document.getElementById('webhook').value;
    const repeat = parseInt(document.getElementById('repeat').value);
  
    try {
      for (let i = 1; i < repeat; i++) {
        // Send JSON data to backend
        const response = await fetch('/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ json: jsonData, webhook: webhookUrl })
        });
  
        const result = await response.text();
        console.log(result);
      }
  
      // Show result page after all submissions are done
      document.getElementById('formPage').style.display = 'none';
      document.getElementById('resultPage').style.display = 'block';
      document.getElementById('result').innerText = `Submitted ${repeat} times successfully.`;
    } catch (error) {
      console.error('Error sending JSON data:', error.message);
    }
  });
  
  document.getElementById('backButton').addEventListener('click', () => {
    // Show form page and hide result page
    document.getElementById('formPage').style.display = 'block';
    document.getElementById('resultPage').style.display = 'none';
  });
  