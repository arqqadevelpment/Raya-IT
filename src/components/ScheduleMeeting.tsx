import { ButtonLink, Container, Eyebrow } from "./ui";

// Sitemap rule: "Schedule a Meeting" leads to a form pre-filled with the solution/technology name.
export default function ScheduleMeeting({ topic }: { topic: string }) {
  return (
    <section className="bg-surface">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <Eyebrow>Schedule a Meeting</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold text-navy">
            Talk to our team about {topic}
          </h2>
        </div>
        <ButtonLink href={`/contact?topic=${encodeURIComponent(topic)}`}>
          Schedule a Meeting
        </ButtonLink>
      </Container>
    </section>
  );
}
