const https = require('https');

// Sample data from the README
const requestData = {
  "type": "snapshot",
  "snapshot": {
    "actors": [
      {
        "type": "Company",
        "id": "1657159247393",
        "name": "HoldCo 1 LLC",
        "legalStatuses": [
          {
            "label": "California LLC",
            "jurisdictionCode": "US-CA"
          }
        ]
      },
      {
        "type": "Trust",
        "id": "1657159327094",
        "name": "Family Trust",
        "legalStatuses": [
          {
            "label": "Florida Trust",
            "jurisdictionCode": "US-FL"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160090833",
        "name": "Sub 15 S.A.",
        "legalStatuses": [
          {
            "label": "Panamanian SA",
            "jurisdictionCode": "PA"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160190727",
        "name": "Sub 20 SAS",
        "legalStatuses": [
          {
            "label": "Colombian SAS",
            "jurisdictionCode": "CO"
          }
        ]
      },
      {
        "type": "Company",
        "id": "1657160439324",
        "name": "Sub 17 S.A.",
        "legalStatuses": [
          {
            "label": "Panamanian SA",
            "jurisdictionCode": "PA"
          }
        ]
      }
    ],
    "ownershipRecords": [
      {
        "ownerId": "1657159327094",
        "ownerName": "Family Trust",
        "propertyId": "1657159247393",
        "amount": 25,
        "unit": "%"
      },
      {
        "ownerId": "1657159247393",
        "ownerName": "HoldCo 1 LLC",
        "propertyId": "1657160090833",
        "amount": 26,
        "unit": "%"
      },
      {
        "ownerId": "1657160090833",
        "ownerName": "Sub 15 S.A.",
        "propertyId": "1657160190727",
        "amount": 98.7,
        "unit": "%"
      },
      {
        "ownerId": "1657160090833",
        "ownerName": "Sub 15 S.A.",
        "propertyId": "1657160439324",
        "amount": 97.5,
        "unit": "%"
      }
    ]
  }
};

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
