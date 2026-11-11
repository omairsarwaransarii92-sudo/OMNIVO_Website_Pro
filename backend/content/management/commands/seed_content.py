from django.core.management.base import BaseCommand

from content.models import ContentSection, SitePage


PAGES = [
    {
        "slug": "home",
        "name": "Home",
        "seo_title": "OMNIVO | Custom Software, AI Agents & Apps",
        "seo_description": "OMNIVO develops custom software, AI agents, web and mobile applications, and SQA/AI testing to solve defined business and product needs.",
        "seo_keywords": "software development company, custom software development, AI agent development, web application development, mobile app development, AI testing",
        "eyebrow": "Software for real business needs",
        "heading": "Custom software, AI agents & apps for real work.",
        "intro": "OMNIVO develops custom software, AI agents, web and mobile applications, and SQA/AI testing. Start with a business or product need; choose the technology only after the job is clear.",
        "sections": [
            ("Five service areas", "Choose a starting point. Keep the goal in view.", "Each capability solves a different kind of product or process challenge. Use the service guide to compare fit and scope."),
            ("Build, adapt or automate?", "Don’t start with a tool. Start with the task.", "A custom build is not automatically better than adapting an existing product. An AI agent is not automatically better than straightforward automation. Compare the workflow, exceptions, current systems and risks before committing to an approach."),
            ("Prepare a useful brief", "Three details make the first chat clearer.", "You do not need a finished specification. A few real-world details are enough to begin discussing fit."),
            ("01", "The work that is difficult today", "Describe the step, delay, hand-off, or product gap you want to change."),
            ("02", "The people and systems involved", "Note who uses the process and which tools, platforms, or data it touches."),
            ("03", "The evidence you would value", "Think about what should work differently and what would help you assess it."),
            ("01 / 05", "Custom software", "For a workflow with a clear gap that existing products may not fit."),
            ("02 / 05", "AI agent development", "For context-heavy tasks where actions and human review need clear boundaries."),
            ("03 / 05", "Web applications", "For browser-based tools shaped around specific users and journeys."),
            ("04 / 05", "Mobile applications", "For product experiences where the device and moment of use matter."),
            ("05 / 05", "SQA & AI testing", "For teams that need clearer evidence about software and AI behavior."),
        ],
    },
    {
        "slug": "services",
        "name": "Services",
        "seo_title": "Software & AI Development Services | OMNIVO",
        "seo_description": "Explore OMNIVO’s custom software, AI agent, web and mobile application, and SQA/AI testing services.",
        "seo_keywords": "custom software development, AI agent development services, web application development, mobile app development, software quality assurance, AI testing",
        "eyebrow": "Five capabilities, different jobs",
        "heading": "Software development for real business needs.",
        "intro": "Compare custom software, AI agent development, web and mobile applications, and SQA/AI testing. Each section outlines a different use case and the questions worth settling before work begins.",
        "sections": [
            ("When a workflow needs a better fit", "Custom software development", "Custom software may suit a business process that existing products cannot support well. The first decision is not simply what to build: compare configuration, integration, and a purpose-built tool against the actual workflow, data, users, constraints, and ongoing ownership.\n\nThat comparison helps define what the software must do, which systems it needs to work with, and how its behavior should be evaluated.\n\nScope prompts\n- Workflow and requirements definition\n- Purpose-built business software\n- Integration and data considerations\n- Testing and ownership questions"),
            ("For context-heavy workflows", "AI agent development", "An AI agent can use context and connected tools to work through a defined task. Whether an agent is a sensible fit depends on the workflow: predictable, rule-based steps may be simpler to automate without an agent.\n\nFor an agent use case, scope the information it may use, permitted actions, points for human approval, and what should happen when the task falls outside expectations. Those boundaries matter as much as the model choice.\n\nScope prompts\n- Use-case fit versus conventional automation\n- Information and tool-access boundaries\n- Human review and exception paths\n- Evaluation criteria for intended tasks"),
            ("For browser-based products and tools", "Web application development", "A web application gives customers or staff a browser-based way to complete tasks, work with information, or use a digital product. Planning starts with the people using it and the journey they need to complete—not a list of screens alone.\n\nScope can then account for user roles, data, connected services, access needs, accessibility expectations, and how the application will be tested and maintained.\n\nScope prompts\n- User roles and task flows\n- Application features and priorities\n- Integration and access requirements\n- Accessibility and quality considerations"),
            ("For work that happens on a device", "Mobile application development", "A mobile application can make sense when a customer or employee needs a dedicated experience on a phone or tablet. The right scope depends on the use case, intended users, target platforms and devices, connectivity, and any device-specific requirements.\n\nDeciding platform coverage and integration needs early gives the project a clearer basis for design, development, and testing.\n\nScope prompts\n- Mobile user journeys and product scope\n- iOS and Android coverage to be agreed\n- Device and integration requirements\n- Testing and release responsibilities"),
            ("For clearer release decisions", "Software quality assurance & AI testing", "Software quality assurance (SQA) helps teams examine whether a product behaves as expected across the scenarios that matter to its users and release. The useful scope depends on product risks, acceptance expectations, and the decision the testing should inform.\n\nAI testing adds questions about variable outputs and behavior across different inputs. Testing can provide evidence about observed behavior; it cannot promise that every defect or risk has been found.\n\nScope prompts\n- Test scope shaped around product risks\n- Expected behavior and scenario coverage\n- Additional evaluation for AI features\n- Findings and limitations for review"),
            ("Common project questions", "Good questions make better scopes.", "A useful first decision is often about fit, trade-offs, and how the work will be evaluated."),
            ("FAQ", "Is custom software always better than an existing product?", "No. If configuration or integration of an existing tool meets the need, it may be a more suitable route. A custom build is worth evaluating when important workflow requirements remain unmet. Compare the options against users, constraints, integration needs, and long-term ownership."),
            ("FAQ", "When might an AI agent be worth exploring?", "Consider an agent when a workflow relies on context, unstructured information, or variable exceptions. If the steps are predictable, conventional automation may be easier to control. Any AI use case should define data access, allowed actions, review points, and evaluation criteria."),
            ("FAQ", "What is the difference between a web application and a custom software project?", "“Web application” describes a browser-based way to use software. “Custom software” describes a solution designed around a particular need. A custom web app can be both; the right format depends on users, workflows, devices, and operating constraints."),
            ("FAQ", "Can software or AI testing guarantee a defect-free release?", "No test plan can establish that every possible defect has been found. Testing can examine agreed scenarios and provide evidence about what was observed, what remains uncertain, and which issues may need attention before a release decision."),
            ("Not sure which service fits?", "Start with the use case. We can scope from there.", "Describe the current workflow, intended users, tools already in use, and the result you want to assess. You do not need a complete technical specification to begin."),
            ("A question about software, AI, apps or testing?", "Let’s define what the work needs.", "Choose a project service."),
        ],
    },
    {
        "slug": "about",
        "name": "About OMNIVO",
        "seo_title": "About OMNIVO | Software & AI Project Approach",
        "seo_description": "See how OMNIVO approaches software and AI projects: clarify the problem, define scope, consider risks, and agree how the work will be evaluated.",
        "seo_keywords": "about OMNIVO, software development approach, AI development partner, software project planning, digital product development",
        "eyebrow": "The problem comes first",
        "heading": "Good products begin with clear questions.",
        "intro": "OMNIVO works across software, AI, applications, and testing. The useful first step is to understand the work a product must do, the people it affects, and the constraints a solution needs to respect.",
        "sections": [
            ("How we see a brief", "A strong brief explains the problem behind the feature.", "That distinction creates room to compare approaches before a choice becomes expensive to change. It also gives the people involved a clearer way to discuss scope, assumptions, and what evidence would make the result useful."),
            ("Working principles", "Four questions keep scope honest.", "Use these to evaluate a digital project before the implementation details take over."),
            ("01", "What should change?", "Describe the user or business task that is difficult today and the difference a solution should make."),
            ("02", "What already exists?", "Current software, data, policies, and team routines shape what can be built or connected."),
            ("03", "Where are the boundaries?", "Clarify access, approvals, platform needs, exceptions, and what should remain under human control."),
            ("04", "What would count as evidence?", "Agree how expected behavior, test findings, and open questions will inform a decision."),
            ("From brief to scope", "Make the important decisions visible.", "A practical project scope records what is known, what still needs an answer, and how choices will be made."),
            ("01", "Frame the need", "Set the intended users, workflow, and problem in plain language."),
            ("02", "Compare the options", "Consider building, adapting, connecting, or automating against the real constraints."),
            ("03", "Agree how to assess it", "Define expected behavior and the evidence that will support review."),
            ("A useful principle", "Good technology decisions make trade-offs visible.", "Scope, risk, assumptions, and open questions belong in the conversation."),
            ("The right scope can start small", "Bring the question you’re working through.", "Start with a project brief."),
        ],
    },
    {
        "slug": "contact",
        "name": "Contact OMNIVO",
        "seo_title": "Contact OMNIVO | Start a Software Project",
        "seo_description": "Share your software, AI, app, or testing challenge with OMNIVO. Outline needs, users, tools, and constraints.",
        "seo_keywords": "software project enquiry, custom software consultation, AI agent project, mobile app development enquiry, software QA consultation, AI testing",
        "eyebrow": "Start with the work",
        "heading": "What needs to work better?",
        "intro": "Tell us about the task, product idea, or quality question you’re dealing with. You can leave the technical solution open; the first useful step is understanding the need.",
        "sections": [
            ("A partial brief is fine", "Start with the part you know.", "Who uses the workflow? What happens now? What would you like to change? A few concrete details help frame the next question."),
            ("Useful context", "Users and workflows", "Users, workflow, current tools, and constraints."),
            ("For AI projects", "Information and actions", "Information, actions, review points, and exceptions."),
            ("For testing projects", "Risks and decisions", "Product risks and the decision testing should inform."),
            ("Form reassurance", "A partial brief is fine.", "Share what is known and flag what is still uncertain."),
        ],
    },
]


class Command(BaseCommand):
    help = "Create the initial OMNIVO pages and editable content sections."

    def handle(self, *args, **options):
        for data in PAGES:
            page_data = {key: value for key, value in data.items() if key != "sections"}
            page, _ = SitePage.objects.update_or_create(slug=data["slug"], defaults=page_data)
            for index, (eyebrow, heading, body) in enumerate(data["sections"]):
                ContentSection.objects.update_or_create(
                    page=page,
                    sort_order=index,
                    defaults={"eyebrow": eyebrow, "heading": heading, "body": body},
                )
            self.stdout.write(self.style.SUCCESS(f"Seeded {page.name}"))