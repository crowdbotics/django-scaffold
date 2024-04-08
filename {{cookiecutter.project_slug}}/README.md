# {{cookiecutter.project_slug}}

This is a repository for a web application developed with Django, built with [Crowdbotics](https://crowdbotics.com)

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Getting Started: Backend](#getting-started-backend)
   - [Docker Setup (recommended)](#docker-setup-recommended)
   - [Local Setup](#local-setup-alternative-to-docker)
4. [Usage](#usage)
   - [Admin Panel](#admin-panel)
   - [API Documentation](#api-documentation)
   - [Security Configuration](#security-configuration)

## Project Structure

    ..
    ├── home                           # Starter home app
    ├── modules                        # Crowdbotics Modules app
    ├── {{cookiecutter.project_slug}}  # Django project configurations
    ├── static                         # Static assets
    ├── users                          # Starter users app
    ├── web_build                      # React Native Web build
    ├── ...
    ├── README.md
    └── ...

## Features

1. **Local Authentication** using email and password with [allauth](https://pypi.org/project/django-allauth/)
2. **Rest API** using [django rest framework](http://www.django-rest-framework.org/)
3. **Forgot Password**
4. [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
5. Toast Notification
6. Inline content editor in homepage

# Getting Started: Backend

Following are instructions on setting up your development environment.

The recommended way for running the project locally and for development is using Docker.

It's possible to also run the project without Docker.

## Docker Setup (Recommended)

This project is set up to run using [Docker Compose](https://docs.docker.com/compose/) by default. It is the recommended way. You can also use existing Docker Compose files as basis for custom deployment, e.g. [Docker Swarm](https://docs.docker.com/engine/swarm/), [kubernetes](https://kubernetes.io/), etc.

1. Install Docker:
   - Linux - [get.docker.com](https://get.docker.com/)
   - Windows or MacOS - [Docker Desktop](https://www.docker.com/products/docker-desktop)
1. Clone this repo and `cd {{cookiecutter.project_slug}}`
1. Make sure `Pipfile.lock` exists. If it doesn't, generate it with:
   ```sh
   $ docker run -it --rm -v "$PWD":/django -w /django python:3.9 /bin/bash -c "pip3 install --no-cache-dir -q pipenv && pipenv lock"
   ```
1. Use `.env.example` to create `.env`:
   ```sh
   $ cp .env.example .env
   ```
1. Update `.env` and `docker-compose.override.yml` replacing all `<placeholders>`
1. Create a secret and use it in you `.env` file as `SECRET=<new generated secret>`.
   1. Use `python -c 'from secrets import token_urlsafe; print("SECRET_KEY=" + token_urlsafe(50))'` to generate the random.
1. Start up the containers:

   ```sh
   $ docker-compose up
   ```

   This will build the necessary containers and start them, including the web server on the host and port you specified in `.env`.

   Current (project) directory will be mapped with the container meaning any edits you make will be picked up by the container.

1. Seed the Postgres DB (in a separate terminal):
   ```sh
   $ docker-compose exec web python3 manage.py makemigrations
   $ docker-compose exec web python3 manage.py migrate
   ```
1. Create a superuser if required:
   ```sh
   $ docker-compose exec web python3 manage.py createsuperuser
   ```
   You will find an activation link in the server log output.

## Local Setup (Alternative to Docker)

1. [Postgresql](https://www.postgresql.org/download/), or SQLite as an alterantive;
1. [Python](https://www.python.org/downloads/release/python-365/);

### Installation

1. Install [pipenv](https://pypi.org/project/pipenv/)
1. Clone this repo and `cd {{cookiecutter.project_slug}}`
1. Run `pip install --user --upgrade pipenv` to get the latest pipenv version.
1. Run `pipenv --python 3.9`
1. Run `pipenv install`
1. Run `cp .env.example .env`
1. Create a secret and use it in you `.env` file as `SECRET=<new generated secret>`.
   1. Use `python -c 'from secrets import token_urlsafe; print("SECRET_KEY=" + token_urlsafe(50))'` to generate the random.
1. Update .env file `DATABASE_URL` with your `database_name`, `database_user`, `database_password`, if you use postgresql.
   Can alternatively set it to `sqlite:////tmp/my-tmp-sqlite.db`, if you want to use sqlite for local development.

### Getting Started

1. Run `pipenv shell`
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Start your `postgres` and `redis` using docker services:

```shell
$ docker-compose up postgres redis
```
You can now use their exposed ports in your `.env` file;

5. Run `python manage.py runserver`
6. Create a superuser if required:
   ```sh
   $ python manage.py createsuperuser
   ```
   You will find an activation link in the server log output.

# Usage

## Admin Panel

Admin Panel can be accessed through http://localhost:8000/admin/. If you are the Project Owner, admin credentials can be generated from App > Settings on [Crowdbotics App Dashboard](https://app.crowdbotics.com/). If not, please request your PM or Project Owner to generate admin credentials and share with you.

## API Documentation

API Documentation is generated automatically and can be access through http://localhost:8000/api-docs/. Please make sure you are signed in to the admin panel before navigating to this page.

## Security Configuration

The Django Backend is pre-configured to enabled certain security configurations through the use of environment variables. This can be done through the Crowdbotics Dashboard's App Settings page.

1. https://docs.djangoproject.com/en/3.2/ref/settings/#secure-ssl-redirect

         SECURE_REDIRECT = True
 
