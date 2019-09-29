.PHONY: install
install:
	npm install

.PHONY: run
run: install
	node app.js