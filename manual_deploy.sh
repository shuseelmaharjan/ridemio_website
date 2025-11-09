#/bin/bash
# set -xe

ssh  root@54.91.15.72 "mkdir -p /root/ridemio_website/ && rm -rf /root/ridemio_website/*"

tar -czf - . | ssh root@54.91.15.72 "tar -xzf - -C /root/ridemio_website/"

ssh root@54.91.15.72 "cd /root/ridemio_website && /usr/local/bin/docker-compose up -d -f docker-compose-prod.yml --force-recreate --build"

echo " Deployment Finished "