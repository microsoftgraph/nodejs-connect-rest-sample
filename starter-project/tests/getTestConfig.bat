@echo off

SET testConfig={
SET testConfig=%testConfig% "test_client_id_v1": "%TEST_CLIENT_ID_V1%",
SET testConfig=%testConfig% "test_client_secret_v1": "%TEST_CLIENT_SECRET_V1%",
SET testConfig=%testConfig% "test_client_id_v2": "%TEST_CLIENT_ID_V2%",
SET testConfig=%testConfig% "test_client_secret_v2": "%TEST_CLIENT_SECRET_V2%",
SET testConfig=%testConfig% "test_username": "%TEST_USERNAME%",
SET testConfig=%testConfig% "test_password": "%1"
SET testConfig=%testConfig%  }
echo %testConfig%
echo %testConfig% > testConfig.json
