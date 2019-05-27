FROM node:8-jessie
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
CMD ["npm", "start"]

# FOR BUILD DOCEKR
# docker build --tag joboonja .

# FOR RUN DOCKER
# docker run -v $/Users/farid/Desktop/UNI/IE/Projects/CA9/IE_CA9_Frontend:/app -v /app/node_modules -p 3001:3000 joboonja
