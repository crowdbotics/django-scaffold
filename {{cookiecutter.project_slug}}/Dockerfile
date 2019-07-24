FROM alpine:latest

# Install system dependencies
RUN apk add --no-cache --update \
  bash \
  gcc \
  build-base \
  musl-dev \
  postgresql-dev \
  python3 \
  python3-dev \
  py3-pip \
  curl \
# zlib, zlib-dev, and libjpeg are required by pillow
  zlib \
  zlib-dev \
  libjpeg
RUN pip3 install --no-cache-dir -q pipenv

# Add our code
ADD ./ /opt/webapp/
WORKDIR /opt/webapp

# Install dependencies
RUN pipenv install --deploy --system

# Allow SECRET_KEY to be passed via arg so collectstatic can run during build time
ARG SECRET_KEY
RUN python3 manage.py collectstatic --no-input

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT {{cookiecutter.project_slug}}.wsgi:application
