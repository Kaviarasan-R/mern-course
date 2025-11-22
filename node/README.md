# Node JS & Databases

A comprehensive guide to node js & databases.

## Lessons

- 01_lesson: File Systems & Event Emitter
- 02_lesson: HTTP Web Server
- 03_lesson: Express Web Server
- 04_lesson: Middlewares
- 05_lesson: Routing
- 06_lesson: MVC Rest API
- 07_lesson: Basic Authentication
- 08_lesson: JWT Authentication
- 09_lesson: RBAC Authorization
- 10_lesson: Mongoose Model
- 11_lesson: MongoDB CRUD

## Create an Express App with Typescript

- Run `npm i express`
- Run `npm i --save-dev nodemon typescript tsc-alias tsconfig-paths ts-node @types/node @types/express`
- Create `nodemon.json` file and paste below snippet.

```
{
  "watch": ["."],
  "ext": "ts,js,json",
  "ignore": ["dist"],
  "exec": "ts-node -r tsconfig-paths/register index.ts"
}
```

- Run `tsc --init` to generate `tsconfig.json`
- Replace below snippet in existing `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": { "@/*": ["*"] },
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
  },
  "include": ["*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

- Replace below snippet in existing `scripts`

```
{
  "dev": "nodemon",
  "build": "tsc && tsc-alias",
  "start": "node dist/index.js"
}
```
