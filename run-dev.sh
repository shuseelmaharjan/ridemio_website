#!/bin/bash

# set -xe
cd /root/ridemio_website && /usr/local/bin/docker-compose -f docker-compose-dev.yml up -d --force-recreate --build
