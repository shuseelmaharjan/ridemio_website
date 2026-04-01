#/bin/bash
set -xe

# cat key/private_key_base | base64 -d > key/private_key
# chmod 400 key/private_key
DEV_IP="202.51.70.66"

ssh root@$DEV_IP "mkdir -p /root/ridemio_website/ && rm -rf /root/ridemio_website/*"

tar -czf - . | ssh root@$DEV_IP "tar -xzf - -C /root/ridemio_website/"

ssh root@$DEV_IP "cd /root/ridemio_website && bash run-dev.sh"

echo " Deployment Finished "

