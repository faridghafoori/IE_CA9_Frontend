FROM node:8-jessie
RUN unset http_proxy
WORKDIR /Users/farid/Desktop/UNI/IE/Projects/CA9/Joboonja
RUN git clone https://github.com/faridghafoori/IE_CA9_Frontend.git
WORKDIR /Users/farid/Desktop/UNI/IE/Projects/CA9/Joboonja/CA9
RUN npm install && \
npm install pm2 -g
RUN npm run build && \
bash -c "echo pm2 start server.js -i 5 $'\n'pm2 logs > runner.sh && chmod +x runner.sh"
CMD /IE/CA9/runner.sh
