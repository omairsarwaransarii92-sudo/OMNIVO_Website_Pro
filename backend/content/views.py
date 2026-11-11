import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import Q
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import Banner, Enquiry, Project, SitePage


def image_url(request, image):
    return request.build_absolute_uri(image.url) if image else ""


def serialize_page(request, page):
    return {
        "slug": page.slug,
        "name": page.name,
        "seoTitle": page.seo_title,
        "seoDescription": page.seo_description,
        "seoKeywords": page.seo_keywords,
        "eyebrow": page.eyebrow,
        "heading": page.heading,
        "intro": page.intro,
        "heroImage": image_url(request, page.hero_image),
        "sections": [
            {
                "id": section.id,
                "eyebrow": section.eyebrow,
                "heading": section.heading,
                "body": section.body,
                "image": image_url(request, section.image),
                "imageAlt": section.image_alt,
            }
            for section in page.sections.all()
        ],
    }


@require_GET
def page_list(request):
    pages = SitePage.objects.filter(is_published=True).prefetch_related("sections")
    return JsonResponse([serialize_page(request, page) for page in pages], safe=False)


@require_GET
def page_detail(request, slug):
    try:
        page = SitePage.objects.prefetch_related("sections").get(slug=slug, is_published=True)
    except SitePage.DoesNotExist:
        return JsonResponse({"detail": "Page not found"}, status=404)
    return JsonResponse(serialize_page(request, page))


@require_GET
def banner_list(request):
    now = timezone.now()
    banners = Banner.objects.filter(is_active=True).filter(
        (Q(starts_at__isnull=True) | Q(starts_at__lte=now)),
        (Q(ends_at__isnull=True) | Q(ends_at__gte=now)),
    )
    return JsonResponse(
        [
            {
                "id": banner.id,
                "title": banner.title,
                "subtitle": banner.subtitle,
                "image": image_url(request, banner.image),
                "imageAlt": banner.image_alt,
                "linkUrl": banner.link_url,
            }
            for banner in banners
        ],
        safe=False,
    )


def serialize_project(request, project):
    return {
        "title": project.title,
        "slug": project.slug,
        "summary": project.summary,
        "description": project.description,
        "image": image_url(request, project.image),
        "imageAlt": project.image_alt,
        "services": [item.strip() for item in project.services.split(",") if item.strip()],
        "featured": project.is_featured,
    }


@require_GET
def project_list(request):
    projects = Project.objects.filter(is_published=True)
    if request.GET.get("featured") == "true":
        projects = projects.filter(is_featured=True)
    return JsonResponse([serialize_project(request, item) for item in projects], safe=False)


@require_GET
def project_detail(request, slug):
    try:
        project = Project.objects.get(slug=slug, is_published=True)
    except Project.DoesNotExist:
        return JsonResponse({"detail": "Project not found"}, status=404)
    return JsonResponse(serialize_project(request, project))


@csrf_exempt
@require_POST
def create_enquiry(request):
    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"detail": "Invalid JSON body"}, status=400)

    required = ("name", "email", "message")
    values = {key: str(payload.get(key, "")).strip() for key in required}
    if any(not values[key] for key in required):
        return JsonResponse({"detail": "Name, email, and message are required"}, status=400)
    try:
        validate_email(values["email"])
    except ValidationError:
        return JsonResponse({"detail": "Enter a valid email address"}, status=400)

    enquiry = Enquiry.objects.create(
        **values,
        company=str(payload.get("company", "")).strip()[:180],
        service=str(payload.get("service", "")).strip(),
        project_stage=str(payload.get("projectStage", "")).strip()[:40],
    )
    return JsonResponse({"id": enquiry.id, "detail": "Enquiry received"}, status=201)