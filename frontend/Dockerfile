# Step 1: Use official Node.js image as the base
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port for React development (usually 3000)
EXPOSE 3000

# Step 7: Run the application (start in development mode)
CMD ["npm", "start"]
