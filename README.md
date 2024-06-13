# Sipaling-Hackaton-Technoscape-2024-app


# To get Started:

```bash
# development
- docker compose -f ./docker/docker-compose.dev.yml --env-file=../.env up -d --build --force-recreate --remove-orphans 

# production with env
- docker compose -f ./docker/docker-compose.prod.yml up -d --build --force-recreate --remove-orphans
```