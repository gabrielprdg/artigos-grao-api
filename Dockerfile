FROM node:20

# Create app directory and set proper ownership
WORKDIR /app

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate

# Change ownership of the app directory to the appuser
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

CMD ["npm", "run", "start"]