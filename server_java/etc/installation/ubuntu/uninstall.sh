#!/bin/sh
#
# description: Uninstalls PamelaChu on Ubuntu
# This script must be run by the "root" user.
#
# Run this script directly by typing :
# ﻿curl -L https://github.com/ippontech/pamelaChu/raw/master/etc/installation/ubuntu/uninstall.sh | sudo bash
#
# - Deletes the "/opt/pamelaChu"
# - Deletes the "pamelaChu" user

echo "PamelaChu uninstaller"

mv /etc/security/limits.conf.original /etc/security/limits.conf

userdel -f -r pamelaChu

echo "Delete PamelaChu directory"
rm -rf /opt/pamelaChu