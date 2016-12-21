all: setup build

.PHONY: build

setup:
	npm install

rebuild:
	npm run rebuild

run:
	npm start

lint:
	npm run lint

test:
	npm test

build:
	npm run build

clean:
	rm -rf node_modules build
