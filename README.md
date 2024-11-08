# Email Data Collection Pipeline with GAS Integration

This project implements an **ELT pipeline** for collecting email data, loading it into S3, and integrating with **Google Apps Script (GAS)** for further processing.

## Overview
- **Lambda Functions** collect and process email data.
- **API Gateway** exposes an endpoint for data collection.
- **S3** stores collected data.
- **GAS** automates tasks like updating Google Sheets or sending emails.

## Getting Started

### Prerequisites
- **AWS CLI**: For AWS interactions.
- **Serverless Framework**: For deployment.
- **Google Apps Script**: Set up a GAS project for automation.
