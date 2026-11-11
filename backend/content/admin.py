from django.contrib import admin

from .models import Banner, ContentSection, Enquiry, Project, SitePage


class ContentSectionInline(admin.StackedInline):
    model = ContentSection
    extra = 0
    ordering = ("sort_order",)
    fields = ("sort_order", "eyebrow", "heading", "body", "image", "image_alt")


@admin.register(SitePage)
class SitePageAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_published", "updated_at")
    list_filter = ("is_published",)
    search_fields = ("name", "slug", "heading")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ContentSectionInline]
    fieldsets = (
        ("Page", {"fields": ("name", "slug", "is_published")}),
        ("Search appearance", {"fields": ("seo_title", "seo_description", "seo_keywords")}),
        ("Hero content", {"fields": ("eyebrow", "heading", "intro", "hero_image")}),
    )


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "sort_order", "starts_at", "ends_at")
    list_filter = ("is_active",)
    search_fields = ("title", "subtitle")
    ordering = ("sort_order", "id")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "is_featured", "sort_order")
    list_filter = ("is_published", "is_featured")
    search_fields = ("title", "summary", "description", "services")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "service", "created_at")
    list_filter = ("service", "created_at")
    search_fields = ("name", "email", "company", "message")
    readonly_fields = ("created_at",)