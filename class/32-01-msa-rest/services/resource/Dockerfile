FROM node:14

WORKDIR /resource/
COPY ./package.json /resource/
COPY ./yarn.lock /resource/
RUN yarn install

COPY . /resource/
CMD yarn start:dev