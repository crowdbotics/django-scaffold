
# django-scaffold
This is a repository for a web application developed with Django, built with [Crowdbotics](https://crowdbotics.com)

### Features
1. **Local Authentication** using email and password with [allauth](https://pypi.org/project/django-allauth/)
2. **Rest API** using [django rest framework](http://www.django-rest-framework.org/)
3. **Forgot Password**
4. Bootstrap4 
5. Toast Notification
6. Inline content editor in homepage 

### Recommended Installation
1. [Postgresql](https://www.postgresql.org/download/)
2. [Python](https://www.python.org/downloads/release/python-365/)

### Installation
1. Install [pipenv](https://pypi.org/project/pipenv/)
2. Clone this repo and `cd django-scaffold`
3. Run `pipenv --python 3.6`
3. Run `pipenv install`
4. Run `cp .env.example .env`
5. Update .env file `DATABASE_URL` with your `database_name`, `database_user`, `database_password`, if you use postgresql. 
    Can alternatively set it to `sqlite:////tmp/my-tmp-sqlite.db`, if you want to use sqlite for local development.


### Getting Started
1. Run `pipenv shell`
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Run `python manage.py runserver`
