# Define variables for Docker Compose
DOCKER_COMPOSE = docker-compose

# Define the targets
.PHONY: build up down logs

# Build the Docker images without cache
build:
	@$(DOCKER_COMPOSE) build --no-cache

# Build and bring up the Docker containers
start: build
	@$(DOCKER_COMPOSE) up -d

# Bring down the Docker containers
down:
	@$(DOCKER_COMPOSE) down

# Show the logs of the Docker containers
logs:
	@$(DOCKER_COMPOSE) logs -f