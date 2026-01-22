interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReleaseDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Release: {id}</h1>
      <p className="text-(--muted)">릴리즈 상세 (개발 중)</p>
    </div>
  );
}
