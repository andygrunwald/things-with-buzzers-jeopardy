.PHONY: install
install:
	npm install

.PHONY: run
run: install
	node app.js

deploy-pi:
	scp -r * pi@192.168.4.1:jeopardy-game/

deploy-pi-lan:
	scp -r * pi@192.168.178.41:jeopardy-game/
