FROM node:8.4.0

# Default NODE_ENV should be production (but it can be overwritten by a parameter)
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Default port should be 80 (but it can be overwritten by a parameter)
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

# Install dependecies first, in a different folder (easier app bind mounting for local development)
WORKDIR /opt
COPY package.json /opt
RUN npm install && npm cache clean --force

# Allows access to the installed npm packages through the $PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Finally, copy the application
WORKDIR /opt/app
COPY . /opt/app

CMD ["node", "app.js"]
