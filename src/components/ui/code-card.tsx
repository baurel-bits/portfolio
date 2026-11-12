type CodeCardProps = {
  caption: string;
  meta: string;
};

export function CodeCard({ caption, meta }: CodeCardProps) {
  return (
    <div className="relative">
      <div className="rounded-lg border border-console-line bg-console p-5 shadow-float">
        <div className="flex items-center justify-between gap-4 border-b border-console-line pb-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-console-line" />
            <span className="size-2 rounded-full bg-console-line" />
            <span className="size-2 rounded-full bg-signal" />
          </div>
          <span className="font-mono text-micro text-console-muted">{caption}</span>
        </div>

        <pre className="mt-4 overflow-x-auto font-mono text-[0.8125rem] leading-7 text-console-text">
          <code>
            <span className="text-accent-on-dark">const</span> profile{" "}
            <span className="text-console-muted">=</span> {"{"}
            {"\n  "}role<span className="text-console-muted">:</span>{" "}
            <span className="text-signal">&quot;frontend&quot;</span>
            <span className="text-console-muted">,</span>
            {"\n  "}backend<span className="text-console-muted">:</span>{" "}
            <span className="text-signal">&quot;spring&quot;</span>
            <span className="text-console-muted">,</span>
           
            {"\n  "}mobile<span className="text-console-muted">:</span>{" "}
            <span className="text-signal">&quot;react native&quot;</span>
            <span className="text-console-muted">,</span>
            {"\n  "}city<span className="text-console-muted">:</span>{" "}
            <span className="text-signal">&quot;Yaoundé&quot;</span>
            <span className="text-console-muted">,</span>
            {"\n  "}open<span className="text-console-muted">:</span>{" "}
            <span className="text-signal">true</span>
            <span className="text-console-muted">,</span>
            {"\n"}
            {"}"} <span className="text-accent-on-dark">as const</span>
            <span className="text-console-muted">;</span>
            {"\n\n"}
            <span className="text-accent-on-dark">export default</span> profile
            <span className="text-console-muted">;</span>
          </code>
        </pre>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-md border border-console-line bg-console-raised px-4 py-3">
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-console-muted">
          {meta}
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-signal">2026</span>
      </div>
    </div>
  );
}
