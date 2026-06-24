type FeatureTextBlockProps = {
  title: string;
  description: string;
  accent?: boolean;
};

export function FeatureTextBlock({
  title,
  description,
  accent = false,
}: FeatureTextBlockProps) {
  return (
    <div className="relative border-b border-border px-8 py-8 last:border-b-0 sm:px-16">
      {accent ? (
        <span className="absolute bottom-0 left-6 top-0 w-px bg-accent sm:left-12" />
      ) : null}
      <h3 className="text-base font-semibold leading-6 text-text-dark">
        {title}
      </h3>
      <p className="mt-3 max-w-[520px] text-sm font-medium leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  );
}
