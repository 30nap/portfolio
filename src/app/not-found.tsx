import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getContent } from "@/lib/content";

export default function NotFound() {
  const { ui } = getContent();

  return (
    <Container size="tight" className="flex flex-col items-start py-28 sm:py-36">
      <p className="font-mono text-sm text-subtle">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{ui.notFound.title}</h1>
      <p className="mt-4 text-muted">{ui.notFound.body}</p>
      <ButtonLink href="/" className="mt-8">
        {ui.notFound.home}
      </ButtonLink>
    </Container>
  );
}
