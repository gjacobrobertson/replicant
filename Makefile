define USAGE
################################
### Scripts to rule them all ###
################################
	bootstrap - Fulfill project dependencies
	ci - Run CI checks
	console - Open node REPL
	down - Stop the application
	server - Start the application
	setup - Initialize or reset application environment. This does reset your development database
	shell - Open a shell in the app container
	test - Run the test suite
	up - Start the application in the background
	update - Update environment after a fresh pull
	usage - Show this prompt
############################
### Other useful scripts ###
############################
	browse - Open the app in a browser
	build - Build images
	edit - Open project in editor
	clean - Stop the application and delete persistent volumes
endef
export USAGE

.DEFAULT_GOAL := usage

.SHELL: /bin/bash

.PHONY: $(MAKECMDGOALS) # Everything below should always run

################################
### Scripts to rule them all ###
################################

bootstrap: build
	docker-compose run --rm app yarn install

ci:
	docker-compose run --rm app yarn ci

console:
	docker-compose run --rm app node --interactive

down:
	docker-compose down --remove-orphans

server:
	docker-compose up

setup: clean bootstrap

shell:
	docker-compose run --rm app ash

test:
	docker-compose run --rm app yarn test

up:
	docker-compose up -d

update: bootstrap

usage:
	@echo "$$USAGE"

############################
### Other useful scripts ###
############################
browse:
	open http://localhost:3000

build:
	docker-compose build

edit:
	code .

clean:
	-docker-compose down --volumes --remove-orphans

