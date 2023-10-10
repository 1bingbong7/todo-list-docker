# Todo List 🚀
REST API for a TODO List

### Prerequisites
Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Docker](https://docs.docker.com/engine/install/)
  
### Installation
Clone the repository:

```
git clone https://github.com/1bingbong7/todo-list-docker
cd todo-list-docker
```

### Install the dependencies:

```
npm install
```

### Create `.env` file for the Environment variables:
You may refer to .env.example file on the repo or code below for the structure.
```
PORT=
MONGODB_URL=
SECRET=
```

### Usage
Start the server (Node/Docker):

```
npm start

OR

docker-compose up --build
```

The application will be running on http://localhost:5000.

### Running Tests

```
npm test
```


### API Documentation

[View the full API documentation here.](https://documenter.getpostman.com/view/13015229/2s9YJhxLPK)
