# Bun image (includes Bun runtime and node compatibility)
FROM oven/bun:1

# setting working directory inside the container
WORKDIR /app

# copying package.json and bun.lockb first (dependency files)
COPY package.json bun.lock ./

# installing only production dependencies for the backend
RUN bun install --production

# Copy the rest of the backend source code into the container
COPY . .

# Expose the port your Hono server will run on
EXPOSE 3000

# running migrations first, then starting the Hono server
# CMD ["sh", "-c", "bun run migrate.ts && bun run start"]
CMD ["sh", "-c", "bun run start"]