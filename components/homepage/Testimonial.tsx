import Image from "next/image";

export function Testimonial() {
  return (
    <section className="px-10">
      <div className="mx-auto max-w-[1280px] border-x border-border bg-surface px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase leading-4 text-accent">
          Success Stories
        </p>
        <blockquote className="mx-auto mt-8 max-w-[800px] text-[24px] font-semibold leading-[34px] text-text-darker sm:text-[30px] sm:leading-[42px]">
          &ldquo;I used to spend my evenings copy-pasting resumes. Now I open
          my dashboard to see interviews waiting. It feels like cheating. Had 3
          offers on the table simultaneously.&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Image
            src="/images/user-icon.png"
            alt="Tom Wilson"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="text-left">
            <p className="text-sm font-semibold leading-5 text-text-primary">
              Tom Wilson
            </p>
            <p className="text-xs font-normal leading-4 text-text-muted">
              Junior Developer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
