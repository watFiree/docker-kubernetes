FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ARG PORT=1500
EXPOSE ${PORT}
ENV PORT=${PORT}
ENV NODE_ENV=production
CMD ["npm", "run", "start"]

