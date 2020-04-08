FROM ubuntu:bionic

ENV LANG C.UTF-8
ARG DEBIAN_FRONTEND=noninteractive
# Allow SECRET_KEY to be passed via arg so collectstatic can run during build time
ARG SECRET_KEY

# libpq-dev and python3-dev help with psycopg2
RUN apt-get update \
  && apt-get install -y python3.7-dev python3-pip libpq-dev curl \
  && apt-get clean all \
  && rm -rf /var/lib/apt/lists/*
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
  && . /root/.nvm/nvm.sh \
  && nvm install --lts \
  && nvm alias default lts/* \
  && nvm use default

WORKDIR /opt/webapp
COPY . .
RUN pip3 install --no-cache-dir -q pipenv && pipenv install --deploy --system
RUN . /root/.nvm/nvm.sh \
  && npm install \
  && npm audit fix \
  && npm rebuild node-sass \
  && npm run build
RUN python3 manage.py collectstatic --no-input

# Run the image as a non-root user
RUN adduser --disabled-password --gecos "" django
USER django

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT {{cookiecutter.project_slug}}.wsgi:application
