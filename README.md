# Important

In vuesax-alpha package, setup these in package.json's exports object

```json
  "exports": {
   // other fields
    "./global": "./global.d.ts",
    "./es/utils": "./es/utils/index.d.ts",
    "./es/constants": "./es/constants/index.d.ts"
  },
```