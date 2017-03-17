all: setup build

setup:
	npm install

run:
	npm start

lint:
	npm run lint

test:
	npm test

build:
	npm run release
.PHONY: build

clean:
	rm -rf node_modules build
