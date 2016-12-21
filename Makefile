all: setup build

.PHONY: build

setup:
	npm install

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
