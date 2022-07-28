#!/bin/sh

# ask nx to build our project
yarn nx run-many --target=build --projects=api,office-booker --parallel

# ask docker to package the builds
docker build -f ./apps/office-booker/Dockerfile . -t frontend
docker build -f ./apps/api/Dockerfile . -t backend

# now both containers are available, and the docker-compose.yml can be used
# note that the database might still need the migration/seeding
