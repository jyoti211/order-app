# Installing npm and nodejs and start app
if [ ! -f /usr/bin/npm ]; then
    echo 'Updating npm'
    sudo apt-get update
    echo 'Installing npm'
    # Install npm from the Debian-based distributions repository
    sudo apt-get install -y npm
    sudo apt install -y nodejs

else
    echo "npm already installed.  Skipping..."
fi

sudo npm install
sudo docker-compose up -d
sleep 5

echo 'Starting Test Cases'
npm test app/test
