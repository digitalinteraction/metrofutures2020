# Metro Futures 2020 Consultation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Vercel dev
The API is designed to be run as Vercel Serverless Functions, which will work when deployed to Vercel. They can be configured for local dev:
```
npm i -g vercel
```
It will require linking to Github, and to the Vercel account. 

To run the development environment (hosting the API):
```
vercel dev
```

To get the `.env` variables, pull them from Vercel
```
vercel env pull
```
