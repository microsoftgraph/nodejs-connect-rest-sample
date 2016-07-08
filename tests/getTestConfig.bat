@echo off

SET testConfig={
SET testConfig=%testConfig% "test_client_id": "%TEST_CLIENT_ID%",
SET testConfig=%testConfig% "test_client_secret": "%TEST_CLIENT_SECRET%",
SET testConfig=%testConfig% "test_username": "%TEST_USERNAME%",
SET testConfig=%testConfig% "test_password": "%1"
SET testConfig=%testConfig%  }
echo %testConfig%
echo %testConfig% > testConfig.json
