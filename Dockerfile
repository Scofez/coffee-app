FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]