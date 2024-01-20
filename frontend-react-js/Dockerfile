FROM node:16.18

ENV PORT=3000

WORKDIR /frontend-react-js

COPY ./package.json /frontend-react-js/package.json
RUN npm install

COPY . /frontend-react-js

EXPOSE ${PORT}
CMD ["npm", "start"]