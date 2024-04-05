.PHONY: build web

format:
	npx prettier . --write

build:
	npx webpack

web:
	npx webpack serve --static-directory web
