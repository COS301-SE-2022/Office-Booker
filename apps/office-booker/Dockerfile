FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/office-booker .
ENV PORT=3334
EXPOSE ${PORT}
RUN npm install --production
RUN npm install reflect-metadata tslib rxjs hbs
CMD node ./main.js
