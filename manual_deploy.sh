#/bin/bash
# set -xe

cat key/private_key_base | base64 -d > key/private_key
ssh -i key/private_key root@54.91.15.72 "mkdir -p /root/ridemio_website/ && rm -rf /root/ridemio_website/*"

tar -czf - . | ssh -i key/private_key root@54.91.15.72 "tar -xzf - -C /root/ridemio_website/"

ssh -i key/private_key root@54.91.15.72 "cd /root/ridemio_website && /usr/local/bin/docker-compose -f docker-compose-prod.yml up -d --force-recreate --build"

rm -rf key/private_key
echo " Deployment Finished "