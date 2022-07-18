[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Portfolio</h3>

  <p align="center">
    <a href="https://www.ericaskari.com">View</a>
    ·
    <a href="https://github.com/ericaskari/ericaskari-web/issues">Report Bug</a>
    ·
    <a href="https://github.com/ericaskari/ericaskari-web/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[//]: # '[![Product Name Screen Shot][product-screenshot]](https://www.ericaskari.com)'

### Built With

-   [Angular](https://angular.io/)
-   [NestJs](https://nestjs.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   node
-   docker

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/ericaskari/ericaskari-web.git
    ```
2. Install NPM packages

    ```sh
    npm install
    ```

3. Start containers
    ```sh
    docker-compose up -d
    ```
4. Start backend

    ```sh
    npm run start:api
    ```

5. Start frontend
    ```sh
    npm run start:web
    ```

<!-- CONTACT -->

## Contact

Mohammad Askari (Eric) - [@Erikaskari](https://twitter.com/Erikaskari) - me@ericaskari.com

Project Link: [https://github.com/ericaskari/ericaskari-web](https://github.com/ericaskari/ericaskari-web)


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


[contributors-shield]: https://img.shields.io/github/contributors/ericaskari/ericaskari-web.svg?style=for-the-badge
[contributors-url]: https://github.com/ericaskari/ericaskari-web/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/ericaskari/ericaskari-web.svg?style=for-the-badge
[issues-url]: https://github.com/ericaskari/ericaskari-web/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username

