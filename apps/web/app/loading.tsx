export default function Loading() {
  return (
    <div className="min-h-screen bg-[#04070f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="h-16 animate-pulse rounded-[26px] border border-white/8 bg-white/[0.04]" />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.85fr]">
          <div className="h-[460px] animate-pulse rounded-[36px] border border-white/8 bg-white/[0.04]" />
          <div className="grid gap-4">
            <div className="h-36 animate-pulse rounded-[28px] border border-white/8 bg-white/[0.04]" />
            <div className="h-36 animate-pulse rounded-[28px] border border-white/8 bg-white/[0.04]" />
            <div className="h-36 animate-pulse rounded-[28px] border border-white/8 bg-white/[0.04]" />
          </div>
        </div>
        <div className="h-[320px] animate-pulse rounded-[30px] border border-white/8 bg-white/[0.04]" />
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.8fr]">
          <div className="h-[520px] animate-pulse rounded-[30px] border border-white/8 bg-white/[0.04]" />
          <div className="grid gap-5">
            <div className="h-[340px] animate-pulse rounded-[30px] border border-white/8 bg-white/[0.04]" />
            <div className="h-[210px] animate-pulse rounded-[30px] border border-white/8 bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  );
}
