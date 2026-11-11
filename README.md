# OMNIVO

OMNIVO uses a Next.js frontend and a Django CMS backend. The existing static HTML pages and source copy are retained as a migration reference; the running site reads published page content, banners, and projects from Django.

## Requirements

- Node.js 20.9 or newer
- Python 3.12 or newer

## Start the Django CMS

From the project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_content
python manage.py createsuperuser
python manage.py runserver
```

Open the CMS at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/). Edit page titles, SEO fields, hero content and ordered text/image sections under **Site pages**. Manage publishable banners under **Banners**, portfolio entries under **Projects**, and submitted forms under **Enquiries**. Uploaded media is stored in `backend/media/` during development.

## Start the Next.js site

In a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend reads the Django JSON API at `http://127.0.0.1:8000/api`; set `NEXT_PUBLIC_API_URL` in `frontend/.env.local` if the API runs elsewhere. The contact form stores submissions in the CMS enquiry inbox.

## API

- `GET /api/pages/` and `GET /api/pages/<slug>/`
- `GET /api/banners/`
- `GET /api/projects/` and `GET /api/projects/<slug>/`
- `POST /api/enquiries/`

## Checks

```bash
cd backend && .venv/bin/python manage.py test content
cd frontend && npm run build
```

The Django settings use SQLite and development-only defaults. Before deployment, set a private `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and production database/media storage. Do not use the development secret in production.
