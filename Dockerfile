FROM node:8.12.0

RUN npm install pm2@3.1.3 --global --quiet
# add local user for security
RUN groupadd -r nodejs \
  && useradd -m -r -g nodejs nodejs

USER nodejs

# copy local files into container, set working directory and user
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
COPY . /home/nodejs/app

RUN npm install --production --quiet

EXPOSE 8080

CMD ["pm2-runtime", "./config/pm2.json"]
