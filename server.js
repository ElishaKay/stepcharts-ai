const https = require('https');
const fs = require('fs');

// Read sample data from JSON file
const requestData = JSON.parse(fs.readFileSync('sample.json', 'utf8'));

// Convert data to JSON string
const postData = JSON.stringify(requestData);

// Configure the request options
const options = {
  hostname: 'svg-api.stepcharts.io',
  port: 443,
  path: '/svg',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Sending POST request to:', `https://${options.hostname}${options.path}`);
console.log('Request data:', JSON.stringify(requestData, null, 2));

// Create the request
const req = https.request(options, (res) => {
  console.log(`\nResponse Status: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);
  
  let responseData = '';
  
  // Collect response data
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  // Handle response completion
  res.on('end', () => {
    console.log('\n=== RESPONSE BODY ===');
    console.log(responseData);
    console.log('\n=== END RESPONSE ===');
    
    // If it's SVG, you might want to save it to a file
    if (res.headers['content-type'] && res.headers['content-type'].includes('svg')) {
      const fs = require('fs');
      fs.writeFileSync('output.svg', responseData);
      console.log('\nSVG saved to output.svg');
    }
  });
});

// Handle request errors
req.on('error', (error) => {
  console.error('Request error:', error);
});

// Send the request
req.write(postData);
req.end();

console.log('\nRequest sent. Waiting for response...');
