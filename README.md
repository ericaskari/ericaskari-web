# Awesome

- [Angular](https://angular.io)
    - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
    - `npm install --save-dev @nrwl/nest`

## Generate an application

Run `nx g @nrwl/angular:app my-app` to generate an application.

Run `nx g @nrwl/nest:app    my-app` to generate an application.

## Generate a library

Run `nx g @nrwl/angular:lib my-lib` to generate a library.

Run `nx g @nrwl/nest:lib    my-lib` to generate a library.

## Development server

Run `docker-compose up -d` for a dev server.


## Create Local SSL

### Generate Authority keys for development
```bash
mkdir -p ~/dev-ca && openssl genrsa -des3 -out ~/dev-ca/certificate-authority.key 2048
mkdir -p ~/dev-ca && openssl req -x509 -new -nodes -key ~/dev-ca/certificate-authority.key -sha256 -days 1825 -out ~/dev-ca/certificate-authority.pem
```
Add the root certificate to keychain and choose always trust.

### Generate Domain Certificate
```bash
openssl genrsa -out ssl.key 2048

openssl req -new -key ssl.key -out ssl.csr

openssl x509 \
-req \
-in ssl.csr \
-CA ~/dev-ca/certificate-authority.pem \
-CAkey ~/dev-ca/certificate-authority.key \
-CAcreateserial \
-out ssl.crt \
-days 825 \
-sha256 \
-extfile ssl.ext
```

