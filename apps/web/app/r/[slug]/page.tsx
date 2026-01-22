interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicReleasePage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">BURIOSA</h1>
      <p className="text-(--muted)">공유 페이지: {slug} (개발 중)</p>
    </div>
  );
}
