const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const app = express();

app.use(express.json());
app.use(cors());

function validateRepositoryId(request, response, next) {
	const { id } = request.params;

	if(!isUuid(id)){
		return response.status(400).json({
			error: 'Invalid exemple ID.'
		})
	}
	return next();
}

app.use('/repositories/:id', validateRepositoryId);

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
	const repository = {id: uuid(), title, url, techs, likes:0};
	repositories.push(repository);
	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body;
	const repositoryIndex = repositories.findIndex(repository => repository.id === id);
	if (repositoryIndex < 0){
		return response.status(400).json({error: 'Repository not found'})
	}
	const repository = {
		id,
		title,
		url,
    techs,
	};
	repositories[repositoryIndex] = repository;
	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
	const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);
	if (findRepositoryIndex >= 0){
		repositories.splice(findRepositoryIndex, 1);
	  return response.status(204).send();
	}else{
    return response.status(400).json({error: 'Repository not found'})
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
	const repositoryIndex = repositories.findIndex(repository.id === id);
  if (repositoryIndex < 0){
		return response.status(400).json({error: 'Repository not found'})
	}
  const repository = {
    ...repositories[repositoryIndex],
    likes: ++repositories[repositoryIndex].likes
  };
  repositories[repositoryIndex] = repository;
	repositories.push(repository);
	return response.json(repository);
});

module.exports = app;
