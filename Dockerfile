FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

ENV AWS_DEFAULT_REGION=us-east-1
ENV AWS_REGION=us-east-1

# CMD ["npm", "run", "start"]
CMD ["/bin/sh"]