import json

from django.test import TestCase

from .models import ContentSection, Enquiry, Project, SitePage


class PublicContentApiTests(TestCase):
    def setUp(self):
        self.page = SitePage.objects.create(
            slug="home",
            name="Home",
            seo_title="Home",
            seo_description="Home description",
            heading="A useful homepage",
        )
        ContentSection.objects.create(page=self.page, heading="First section", body="Page copy")
        SitePage.objects.create(
            slug="draft", name="Draft", seo_title="Draft", seo_description="Draft", heading="Draft", is_published=False
        )
        Project.objects.create(title="Published project", summary="Visible", is_published=True)
        Project.objects.create(title="Draft project", summary="Hidden", is_published=False)

    def test_published_page_includes_sections(self):
        response = self.client.get("/api/pages/home/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["sections"][0]["body"], "Page copy")

    def test_draft_page_is_not_public(self):
        self.assertEqual(self.client.get("/api/pages/draft/").status_code, 404)

    def test_project_list_excludes_drafts(self):
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["title"] for item in response.json()], ["Published project"])

    def test_enquiry_requires_valid_contact_details(self):
        response = self.client.post(
            "/api/enquiries/",
            data=json.dumps({"name": "A User", "email": "not-an-email", "message": "Hello"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_enquiry_is_saved(self):
        response = self.client.post(
            "/api/enquiries/",
            data=json.dumps({"name": "A User", "email": "user@example.com", "message": "Hello"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Enquiry.objects.get().email, "user@example.com")