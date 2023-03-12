FROM node:18-alpine AS development

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Copy lock files
COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc .

# install pnpm
RUN npm install -g pnpm

# Install all dependencies
RUN pnpm install

# Copy app files
COPY . .

# Start the app
CMD ["pnpm", "run", "dev" ]