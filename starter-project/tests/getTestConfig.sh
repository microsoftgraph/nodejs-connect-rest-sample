#!/bin/bash

testConfig="{
    \"test_client_id_v1\": \"$test_client_id_v1\",
    \"test_client_secret_v1\": \"$test_client_secret_v1\",
    \"test_client_id_v2\": \"$test_client_id_v2\",
    \"test_client_secret_v2\": \"$test_client_secret_v2\",
    \"test_username\": \"$test_username\",
    \"test_password\": \"$1\"
}"
echo $testConfig
echo $testConfig > testConfig.json
