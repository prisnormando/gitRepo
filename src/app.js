const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;
	const results = title
		? repositories.filter(repository => repository.title.includes(title))
		: repositories;
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, owner} = request.body;
	const repository = {id: uuid(), title, owner };
	repositories.push(repository);
	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
	const repositoryIndex = repositories.findIndex(repositories => repository.id === id);
	if (repositoryIndex < 0){
		return response.status(400).json({error: 'Repository not found'})
	}
	const repository = {
		id,
		title,
		owner,
	}
	repositories[repositoryIndex] = repository;
	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
	const repositoryIndex = repositories.findIndex(repositories => repository.id === id);
	if (repositoryIndex < 0){
		return response.status(400).json({error: 'Repository not found'})
	}
	repositories.splice(repositoryIndex, 1);
	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {title, owner} = request.body;
	const repository = {id: uuid(), title, owner };
	repositories.push(repository);
	return response.json(repository);
});

module.exports = app;
