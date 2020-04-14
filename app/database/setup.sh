#!/usr/bin/env bash

docker build -t mdeditordb:1.0 .
docker run -it -d -p 3306:3306 --env-file ./env.txt mdeditordb:1.0
