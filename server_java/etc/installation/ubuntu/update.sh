#!/bin/sh
#
# description: Updates PamelaChu from Git
# This script must be run by the "pamelaChu" user, who must be a sudoer.
echo "Welcome to the PamelaChu updater"

#################################
# Variables
#################################
echo "Setting up variables"
export USER=pamelaChu
export PAMELACHU_DIR=/opt/pamelaChu

#################################
# Update application
#################################
cd $PAMELACHU_DIR/application/pamelaChu
git pull
cd /opt/pamelaChu/application/pamelaChu && mvn -Pprod -DskipTests clean package
sudo /etc/init.d/jetty stop
sudo cp /opt/pamelaChu/application/pamelaChu/target/root.war /opt/jetty/webapps/root.war
sudo /etc/init.d/jetty start
