from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import slugify


class SitePage(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    seo_title = models.CharField(max_length=180)
    seo_description = models.CharField(max_length=320)
    seo_keywords = models.CharField(max_length=500, blank=True)
    eyebrow = models.CharField(max_length=140, blank=True)
    heading = models.CharField(max_length=240)
    intro = models.TextField(blank=True)
    hero_image = models.ImageField(upload_to="pages/", blank=True)
    is_published = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["slug"]

    def __str__(self):
        return self.name


class ContentSection(models.Model):
    page = models.ForeignKey(SitePage, related_name="sections", on_delete=models.CASCADE)
    eyebrow = models.CharField(max_length=140, blank=True)
    heading = models.CharField(max_length=240)
    body = models.TextField(blank=True)
    image = models.ImageField(upload_to="sections/", blank=True)
    image_alt = models.CharField(max_length=180, blank=True)
    sort_order = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.page.name}: {self.heading}"


class Banner(models.Model):
    title = models.CharField(max_length=180)
    subtitle = models.TextField(blank=True)
    image = models.ImageField(upload_to="banners/")
    image_alt = models.CharField(max_length=180, blank=True)
    link_url = models.CharField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    starts_at = models.DateTimeField(null=True, blank=True)
    ends_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True, blank=True)
    summary = models.CharField(max_length=280)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True)
    image_alt = models.CharField(max_length=180, blank=True)
    services = models.CharField(max_length=240, blank=True, help_text="Comma-separated service labels")
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Enquiry(models.Model):
    SERVICE_CHOICES = [
        ("custom-software", "Custom software development"),
        ("ai-agents", "AI agent development"),
        ("web-applications", "Web application development"),
        ("mobile-applications", "Mobile application development"),
        ("sqa-ai-testing", "SQA / AI testing"),
        ("", "Not sure yet"),
    ]
    name = models.CharField(max_length=120)
    email = models.EmailField()
    company = models.CharField(max_length=180, blank=True)
    service = models.CharField(max_length=40, choices=SERVICE_CHOICES, blank=True)
    project_stage = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.created_at:%Y-%m-%d}"