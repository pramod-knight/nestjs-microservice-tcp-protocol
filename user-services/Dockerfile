#Base image of node
FROM node:latest

WORKDIR /app

#copy package.json and other which are core file
COPY package.json pnpm-lock.yaml ./

# install packages
RUN npm install -g pnpm
RUN npm i -g @nestjs/cli

RUN pnpm install

#Copy all remaining code
COPY . .

#Create build
RUN pnpm build

#Run the application
CMD [ "pnpm" ,"start"]