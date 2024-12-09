# To-Do List Application

This is a simple To-Do List application built with React for the frontend and FastAPI for the backend. The application allows users to register, log in, and manage their tasks.

## Technologies Used

- **Frontend**: React
- **Backend**: FastAPI (Python)
- **Database**: SQLite (for simplicity)
- **Docker**: Docker Compose for containerization

## Prerequisites

Before you run the application with Docker, make sure you have the following installed:

- Docker
- Docker Compose

You can check if you have Docker installed by running:

```bash
docker --version
docker-compose --version
```

# To-Do List Application

This is a simple To-Do List application built with React for the frontend and FastAPI for the backend. The application allows users to register, log in, and manage their tasks.

## Technologies Used

- **Frontend**: React
- **Backend**: FastAPI (Python)
- **Database**: SQLite (for simplicity)
- **Docker**: Docker Compose for containerization

## Prerequisites

Before you run the application with Docker, make sure you have the following installed:

- Docker
- Docker Compose

You can check if you have Docker installed by running:

```bash
docker --version
docker-compose --version
```

If you don't have Docker, you can download it from here (https://www.docker.com/products/docker-desktop/).


## Cloning the Repository

To get started with this project, you first need to clone the repository to your local machine:

```bash
git clone https://github.com/mintsupst/to-do-list.git
cd your-repository
```

## Running the Application with Docker Compose

Once you have the project on your machine, you can start the entire application with Docker Compose, which will launch both the frontend and backend in their respective containers.

1. Build and Start the Containers

In the project root directory, where the docker-compose.yml file is located, run the following command:
```bash
docker-compose up --build
```
This command will:

    Build the images for both the frontend and backend
    Start the containers and link them together

2. Access the Application

    Frontend: The React frontend will be available at http://localhost:3000.
    Backend: The FastAPI backend will be running at http://localhost:8000.

    Main page is available at http://localhost:3000/register
    other routes are: /login, /tasks (protected)
    API docs at http://localhost:8000/docs

3. Stopping the Containers

To stop the containers, press Ctrl+C in the terminal or run the following command:
```bash
docker-compose down
```
This will stop and remove the containers but keep the data volumes intact.
4. Clearing Data

If you want to remove all containers and volumes (including the SQLite database):

docker-compose down --volumes

This will remove the volumes and the SQLite database data.
Development

    Frontend: The frontend is built using React. The code is located in the /frontend directory.
    Backend: The backend is built using FastAPI. The code is located in the /backend directory.