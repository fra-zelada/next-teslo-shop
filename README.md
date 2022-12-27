# Next.js Teslo-shop App

<p><a href="https://next-teslo-shop-eight.vercel.app/" title="Redirect to Teslo Shop">
<img 
src="https://res.cloudinary.com/dwvkka6mz/image/upload/v1671229222/teslo_jbftas.png"></a></p>

[Live Demo](https://next-teslo-shop-eight.vercel.app/)

Sitio WEB inspirado en tienda de Tesla. Alguna de las características del sitio son autenticación con OAuth, integración a módulo de pago PayPal y renderizado por lado de servidor. El sitio fue desarrollado con Next.Js, Typescript, Material UI y MongoDB. Esta web la desarrollé con las indicaciones del curso “Next.js: El framework de React para producción” del profesor Fernando Herrera.

Para correr localmente se necesita la bd

```
docker-compose up -d
```

-   el -d significa **detached**

-   MongoDB URL local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## configurar las variables de entorno

renombrar el archivo **.env.template** a **.env**

## llenar la BD con información de prueba

Llamar url:
`http://localhost:3000/api/seed`
