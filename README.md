# Next.js Teslo-shop App
Para correr localmente se necesita la bd
```
docker-compose up -d
```
* el -d significa __detached__

* MongoDB URL local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## configurar las variables de entorno

renombrar el archivo __.env.template__ a __.env__

## llenar la BD con información de prueba

Llamar url:
```http://localhost:3000/api/seed```