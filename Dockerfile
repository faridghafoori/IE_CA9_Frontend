# FOR BUILD DOCEKR
# docker build --tag react .

# FOR RUN DOCKER
# docker run -d --name frontend -v $/Users/farid/Desktop/UNI/IE/Projects/CA9/IE_CA9_Frontend:/app -v /app/node_modules react

FROM node:8-jessie
LABEL maintainer="faridghafooriadl@gmail.com"
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
EXPOSE 3030
CMD ["npm", "start"]
