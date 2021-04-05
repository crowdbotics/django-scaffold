# Crowdbotics Django Scaffold

This is the Crowdbotics Django cookiecutter template used for our Django
projects.

It includes:

* Users: allauth, custom user model with name
* Django REST Framework for APIs
* Bootstrap 4
* Sendgrid for email via env vars
* Whitenoise for static files


# Recommendations

## Storing media files

If you need to use media files, any file should be stored in AWS S3 (Refer to `django
-storages` lib documentation to detailed info). Heroku file system is ephemeral
, which means that any media file will be deleted after some time. 
  
  For most basic usage of AWS S3, you need to set these environment variables:
  
```python
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_STORAGE_BUCKET_NAME
AWS_STORAGE_REGION
```

## Outgoing email

To use transactional emails, you might need to setup a SMTP manager library. We
 recommend usage of `Sendgrid`. It's easily configurable and have a great integration
  with Django apps. You can refer to their official tutorial [here](https://sendgrid.com/docs/for-developers/sending-email/django/).

# Web

The web frontend is a reactJS app. 

When you import you web page design in figma file in CB app, the importer will generate code using React-Native-Web and add it to the web frontend. 

After you deployed the app, you might access to the pages with URL convention below: https://{your-app-url}/{component-name}. please check the web/src/routes.js to see component-name