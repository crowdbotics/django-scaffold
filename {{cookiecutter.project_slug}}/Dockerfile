FROM python:3.7-slim-buster

ENV LANG C.UTF-8
ENV PYTHONUNBUFFERED TRUE
ENV PORT 8080

ARG SECRET_KEY=build

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        curl \
    && apt-get clean all \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/webapp

COPY Pipfil* ./
RUN pip3 install --no-cache-dir -q 'pipenv==2018.11.26' && pipenv install --deploy --system

COPY . .

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT {{cookiecutter.project_slug}}.wsgi:application
