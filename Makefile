.PHONY: build web

build:
	npx webpack

web:
	npx webpack serve --static-directory web
