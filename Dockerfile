FROM node:19.0.1-slim

COPY . .

RUN npm install

RUN npm run build

COPY . .

CMD npm run preview

EXPOSE 5173