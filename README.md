# Challenge for Keypro (Django + React TS)

## Run the project on Linux
```
make start
```

## Run the project on Windows
```
docker-compose build --no-cache
docker-compose up -d
```

## Run backend tests and generate HTML report 
```
pytest --cov=api --cov-report=html tests/  
```