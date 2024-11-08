const axios = require('axios');  // You can install axios for HTTP requests
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const GAS_URL = process.env.GAS_URL;

module.exports.lambdaHandler = async (event) => {
  try {
    // Send GET request to Google Apps Script
    const response = await axios.get(GAS_URL);

    if (response.status === 200 && response.data.status === 'success') {
      // Get the email data from the response
      const emailData = response.data.data;

      // Upload email data to S3 bucket
      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: 'email_data.json',
        Body: JSON.stringify(emailData),
        ContentType: 'application/json',
      };

      await s3.putObject(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data successfully sent to S3!' }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error: Google Apps Script response invalid' }),
      };
    }
  } catch (error) {
    console.error('Error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: ${error.message}` }),
    };
  }
};
