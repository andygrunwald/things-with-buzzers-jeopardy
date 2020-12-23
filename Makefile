.DEFAULT_GOAL := help

.PHONY: help
help: ## Outputs the help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Install dependencies
	npm install && bower install

.PHONY: run
run: install ## Compiles and starts the application for development
	node app.js

.PHONY: build-docker
build-docker: ## Builds the docker production image
	docker build -t andygrunwald/things-with-buzzers-jeopardy:latest .

.PHONY: run-docker
run-docker: build-docker ## Run the docker production image
	docker run --publish 3000:3000 andygrunwald/things-with-buzzers-jeopardy:latest
