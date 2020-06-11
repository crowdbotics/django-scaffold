FROM python:3.7-slim-buster

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
ARG SECRET_KEY
RUN python3 manage.py collectstatic --no-input

# Run the image as a non-root user
RUN adduser --disabled-password --gecos "" django
USER django

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT {{cookiecutter.project_slug}}.wsgi:application
