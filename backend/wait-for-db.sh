#!/bin/bash

echo " Waiting for Postgres to be ready..."

./wait-for-it.sh db:5432 --timeout=30 --strict -- npm run dev