from django.urls import path

from . import views

urlpatterns = [
    path("pages/", views.page_list, name="page-list"),
    path("pages/<slug:slug>/", views.page_detail, name="page-detail"),
    path("banners/", views.banner_list, name="banner-list"),
    path("projects/", views.project_list, name="project-list"),
    path("projects/<slug:slug>/", views.project_detail, name="project-detail"),
    path("enquiries/", views.create_enquiry, name="create-enquiry"),
]