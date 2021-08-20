#!/bin/sh

set -e

echo "🎸 Running migrations"
python3 manage.py migrate

echo "📦 Collect statistics"
python3 manage.py collectstatic --noinput