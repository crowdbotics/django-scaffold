FROM ubuntu:bionic

ENV LANG C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive
# Allow SECRET_KEY to be passed via arg so collectstatic can run during build time
ARG SECRET_KEY

# libpq-dev and python3-dev help with psycopg2
RUN apt-get -qq update \
  && apt-get -qq install -y python3.7-dev python3-pip libpq-dev \
  && apt-get -qq clean all \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/webapp
COPY . .
RUN pip3 install --no-cache-dir -q pipenv && pipenv install --deploy --system
RUN mkdir -p build/static
RUN python3 manage.py collectstatic --no-input

# Run the image as a non-root user
RUN adduser --disabled-password --gecos "" django
USER django

CMD waitress-serve --port=$DJANGO_PORT {{cookiecutter.project_slug}}.wsgi:application
