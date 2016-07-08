#!/bin/bash

testConfig="{
    \"test_client_id\": \"$TEST_CLIENT_ID\",
    \"test_client_secret\": \"$1\",
    \"test_username\": \"$TEST_USERNAME\",
    \"test_password\": \"$2\"
}"
echo $testConfig
echo $testConfig > testConfig.json
