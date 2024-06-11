FROM node:20

WORKDIR /usr/src/app

COPY . .

# ENV VITE_BACKEND_URL=http://localhost:3000

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]