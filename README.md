# Sipaling-Hackaton-Technoscape-2024-app

note: you need to setup langchain to use this app.
checkout: 

https://github.com/sipaling-hackaton/Sipaling-Hackaton-Technoscape-2024-Langchain.git

## Description
This is a simple chat application that allows users to chat with model and get
recommendation. It also has a CRM dashboard that allows users to manage their customers and also import data from a CSV file.

#  To get started with manual setup
```bash
# requirements
- nodejs v18+
- mongodb atlas

pnpm install
pnpm run dev

# open in browser
```


# To get Started with docker:

```bash
# development
- docker compose -f ./docker/docker-compose.dev.yml up -d --build --force-recreate --remove-orphans 

# production with env
- docker compose -f ./docker/docker-compose.prod.yml up -d --build --force-recreate --remove-orphans
```
Open your browser and navigate to `http://localhost:3000` to see the app running.


# Home
![home page](/docs/asset/homepage-1.png)

# CRM
![crm dasboard](/docs/asset/crm-dashboard.png)

![alt text](/docs/asset/crm-data-import.png)

# Chat  
![alt text](/docs/asset/chat.png)

