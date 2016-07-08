#!/bin/bash

testConfig="{
    \"test_client_id\": \"$TEST_CLIENT_ID\",
    \"test_client_secret\": \"$1\",
    \"test_username\": \"$TEST_USERNAME\",
    \"test_password\": \"$2\"
}"
echo $testConfig
echo $testConfig > testConfig.json

adb devices | while read line
do
if [ ! "$line" = "" ] && [ `echo $line | awk '{print $2}'` = "device" ]
then
    device=`echo $line | awk '{print $1}'`
    echo "$device $@ ..."
    adb -s $device push testConfig.json ./data/local
fi
done
