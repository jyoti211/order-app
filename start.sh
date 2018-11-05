# Installing Docker CE
if [ ! -f /usr/bin/docker ]; then
    echo 'Installing Docker CE'
    # Install Docker CE from the Debian-based distributions repository
    sudo apt-get install -y docker-ce

else
    echo "Docker CE already installed.  Skipping..."
fi

# Installing Docker Compose
if [ ! -f /usr/bin/docker-compose ]; then
    echo 'Installing Docker Compose'
    # Install Docker Compose from the Debian-based distributions repository
    sudo apt-get install -y docker-compose

else
    echo "Docker Compose already installed.  Skipping..."
fi

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
sleep 120

echo 'Starting Test Cases'
npm test app/test




