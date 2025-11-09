#!/bin/bash

set -xe
cd /root/ridemio_website && /usr/local/bin/docker-compose up -d -f docker/docker-compose-prod.yml --force-recreate --build