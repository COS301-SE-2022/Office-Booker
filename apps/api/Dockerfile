FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/api .
COPY ./prisma ./prisma/
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install
#RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express @nestjs-modules/mailer
RUN npx prisma generate
CMD node ./main.js
