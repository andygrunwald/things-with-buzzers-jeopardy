.PHONY: install
install:
	npm install && bower install

.PHONY: run
run: install
	node app.js