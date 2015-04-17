#!/bin/sh
#
# description: Installs PamelaChu on Ubuntu
# This script must be run by the "root" user.
# Run this script directly by typing :
# ﻿curl -L https://github.com/ippontech/pamelaChu/raw/master/etc/installation/ubuntu/install.sh | sudo bash
#
# - PamelaChu is installed in the "/opt/pamelaChu" directory
# - PamelaChu is run by the "pamelaChu" user
#
echo "Welcome to the PamelaChu installer"

#################################
# Variables
#################################
echo "Setting up variables"
export USER=pamelaChu
export PAMELACHU_DIR=/opt/pamelaChu
export MAVEN_VERSION=3.0.4
export JETTY_VERSION=8.1.8.v20121106

#################################
# Install missing packages
#################################
echo "Installing missing packages"
apt-get install git-core curl wget -y --force-yes

#################################
# Install Java
#################################
wget https://github.com/flexiondotorg/oab-java6/raw/0.2.6/oab-java.sh -O oab-java.sh
chmod +x oab-java.sh
sudo ./oab-java.sh
rm oab-java.sh
sudo apt-get install sun-java6-jdk -y

#################################
# Create directories & users
#################################
echo "Creating directories and users"
useradd -m -s /bin/bash $USER

mkdir -p $PAMELACHU_DIR
mkdir -p $PAMELACHU_DIR/application
mkdir -p $PAMELACHU_DIR/maven
mkdir -p $PAMELACHU_DIR/data
mkdir -p $PAMELACHU_DIR/data/elasticsearch
mkdir -p $PAMELACHU_DIR/log
mkdir -p $PAMELACHU_DIR/log/elasticsearch

#################################
## Download Application
#################################
echo "Getting the application from Github"
cd $PAMELACHU_DIR/application

git clone https://github.com/ippontech/pamelaChu.git

#################################
## Install Cassandra
#################################
cd $PAMELACHU_DIR

echo "Installing JNA"
sudo apt-get install libjna-java -y

echo "Configuring OS limits"
cp /etc/security/limits.conf /etc/security/limits.conf.original

echo "* soft nofile 32768" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 32768" | sudo tee -a /etc/security/limits.conf
echo "root soft nofile 32768" | sudo tee -a /etc/security/limits.conf
echo "root hard nofile 32768" | sudo tee -a /etc/security/limits.conf

echo "* soft nofile 32768"  >> /etc/security/limits.conf
echo "* hard nofile 32768"  >> /etc/security/limits.conf
echo "root soft nofile 32768"  >> /etc/security/limits.conf
echo "root hard nofile 32768"  >> /etc/security/limits.conf
echo "* soft memlock unlimited"  >> /etc/security/limits.conf
echo "* hard memlock unlimited"  >> /etc/security/limits.conf
echo "root soft memlock unlimited"  >> /etc/security/limits.conf
echo "root hard memlock unlimited"  >> /etc/security/limits.conf
echo "* soft as unlimited"  >> /etc/security/limits.conf
echo "* hard as unlimited"  >> /etc/security/limits.conf
echo "root soft as unlimited"  >> /etc/security/limits.conf
echo "root hard as unlimited"  >> /etc/security/limits.conf

sysctl -w vm.max_map_count=131072

sudo swapoff --all

# Cassandra Installation
echo "Installing Cassandra"
echo "deb http://debian.datastax.com/community stable main"  >> /etc/apt/sources.list
curl -L http://debian.datastax.com/debian/repo_key | sudo apt-key add -
sudo apt-get update
sudo apt-get install python-cql dsc1.1 -y
sudo apt-get install opscenter-free -y

sudo service opscenterd start

#################################
## Install Jetty
#################################
echo "Installing Jetty"
cd $PAMELACHU_DIR

sysctl -w net.core.rmem_max=16777216
sysctl -w net.core.wmem_max=16777216
sysctl -w net.ipv4.tcp_rmem="4096 87380 16777216"
sysctl -w net.ipv4.tcp_wmem="4096 16384 16777216"
sysctl -w net.core.somaxconn=4096
sysctl -w net.core.netdev_max_backlog=16384
sysctl -w net.ipv4.tcp_max_syn_backlog=8192
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_recycle=1
sysctl -w net.ipv4.tcp_congestion_control=cubic

wget http://central.maven.org/maven2/org/mortbay/jetty/dist/jetty-deb/$JETTY_VERSION/jetty-deb-$JETTY_VERSION.deb
dpkg -i jetty-deb-$JETTY_VERSION.deb
rm -f jetty-deb-$JETTY_VERSION.deb
rm -rf /opt/jetty/webapps/*

#################################
## Install Maven
#################################
echo "Installing Maven"

cd $PAMELACHU_DIR/maven

wget http://mirrors.linsrv.net/apache/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz
tar -xzf apache-maven-$MAVEN_VERSION-bin.tar.gz
rm -f apache-maven-$MAVEN_VERSION-bin.tar.gz
ln -s $PAMELACHU_DIR/maven/apache-maven-$MAVEN_VERSION $PAMELACHU_DIR/maven/current

# Configure Maven for the pamelaChu user
echo "# Begin pamelaChu configuration" ﻿>> /home/pamelaChu/.profile
echo "export M2_HOME=/opt/pamelaChu/maven/current" >> /home/pamelaChu/.profile
echo "export PATH=/opt/pamelaChu/maven/current/bin:$PATH" >> /home/pamelaChu/.profile
echo "export MAVEN_OPTS=\"-XX:MaxPermSize=64m -Xms256m -Xmx1024m\"" >> /home/pamelaChu/.profile
echo "# End pamelaChu configuration" ﻿>> /home/pamelaChu/.profile

# Configure Maven repository
mkdir -p $PAMELACHU_DIR/maven/repository
cp $PAMELACHU_DIR/application/pamelaChu/etc/installation/ubuntu/files/maven/settings.xml $PAMELACHU_DIR/maven/apache-maven-$MAVEN_VERSION/conf

#################################
## Install & run Application
#################################
chown -R $USER $PAMELACHU_DIR
./update.sh

#################################
## Post install
#################################
