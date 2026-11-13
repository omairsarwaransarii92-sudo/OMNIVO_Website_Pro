from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.urls import include, path


def root_view(request):
    return JsonResponse({
        "status": "ok",
        "service": "OMNIVO Backend API",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
        },
    })


urlpatterns = [
    path("", root_view, name="root"),
    path("admin/", admin.site.urls),
    path("api/", include("content.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)