import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: `Resume and experience for ${SITE_NAME}.`,
};

export default function CvPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Curriculum vitae</h1>
        <p className="text-muted">
          Barcelona ·{" "}
          <a className="text-accent hover:underline" href="mailto:andres@dres.co">
            andres@dres.co
          </a>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Summary</h2>
        <p className="text-muted leading-relaxed">
          Full stack engineer with 10+ years of experience, recently expanding into tech
          lead and software architecture roles across multiple projects. Known for
          ownership, calm execution under pressure, and collaborative environments where
          developers can thrive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Technical skills</h2>
        <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li>
            <span className="font-medium text-foreground">Languages:</span>{" "}
            JavaScript/TypeScript, Python, PHP, C#, Java
          </li>
          <li>
            <span className="font-medium text-foreground">Frontend:</span> React,
            Angular, Gatsby
          </li>
          <li>
            <span className="font-medium text-foreground">Backend:</span> Node.js,
            Flask, Django, Laravel
          </li>
          <li>
            <span className="font-medium text-foreground">CMS / ecommerce:</span>{" "}
            Shopify, WordPress, Strapi, Directus
          </li>
          <li>
            <span className="font-medium text-foreground">Other:</span> CI/CD, DevOps,
            Oracle, Postgres
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Leadership & architecture
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted">
          <li>
            Tech lead across concurrent projects; owned architecture and direction.
          </li>
          <li>Designed scalable architectures, data models, and integrations.</li>
          <li>Led small teams (3+ engineers), coordinated delivery and quality.</li>
          <li>Defined standards and mentored developers.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">Experience</h2>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-medium text-foreground">
              Verndale (formerly AMP Agency)
            </h3>
            <span className="text-xs uppercase tracking-wide text-muted">
              Apr 2021 – present · Remote (US)
            </span>
          </div>
          <p className="text-sm font-medium text-muted">Senior full stack engineer</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted">
            <li>
              Led full-stack delivery for major brands including Maruchan, iRobot, and
              Opalescence.
            </li>
            <li>Tech lead in fast-paced environments with tight deadlines.</li>
            <li>Architecture decisions and technology selection across projects.</li>
            <li>
              Partnered with stakeholders, design, and product to ship scalable
              solutions.
            </li>
          </ul>
        </div>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-medium text-foreground">CERN</h3>
            <span className="text-xs uppercase tracking-wide text-muted">
              Oct 2020 – Jul 2024 · Geneva
            </span>
          </div>
          <p className="text-sm font-medium text-muted">Software engineer</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted">
            <li>
              Led mission-critical tools for physicists in the CMS experiment, used
              globally.
            </li>
            <li>
              Owned architecture, maintenance, and modernization of Python web and CLI
              applications.
            </li>
            <li>Migrated core services to new SSO and redesigned permission models.</li>
            <li>
              Full-stack delivery with Flask, Angular, DevOps, CI/CD, Oracle, and
              SQLite.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-medium text-foreground">Verndale</h3>
            <span className="text-xs uppercase tracking-wide text-muted">
              Dec 2013 – Aug 2020 · Quito
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted">
              Senior engineer (2017 – 2020)
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted">
              <li>Enterprise digital platforms; scalable web applications.</li>
              <li>React frontends and REST APIs across the stack.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted">
              Back end developer (2013 – 2017)
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted">
              <li>Core developer for Honda Powersports and related platforms.</li>
              <li>
                Promoted to lead developer; Sitecore solutions for enterprise clients.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Education</h2>
        <ul className="space-y-3 text-sm text-muted">
          <li>
            <span className="font-medium text-foreground">
              Universidad San Francisco de Quito
            </span>{" "}
            — Computer Science (2009–2014)
          </li>
          <li>
            <span className="font-medium text-foreground">
              University of British Columbia
            </span>{" "}
            — Computer Science, two semesters (2008–2009). International Leader of
            Tomorrow Award (renewable scholarship).
          </li>
        </ul>
      </section>
    </article>
  );
}
