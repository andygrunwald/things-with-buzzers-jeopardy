.DEFAULT_GOAL := help

TWB_QUESTION_SERVER ?= host.docker.internal:8080

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
	docker run --env TWB_QUESTION_SERVER=$(TWB_QUESTION_SERVER) --publish 3000:3000 andygrunwald/things-with-buzzers-jeopardy:latest
