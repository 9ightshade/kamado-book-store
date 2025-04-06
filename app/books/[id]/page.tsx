import BookDetail from '@/components/BookDetail';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps): JSX.Element {
  const { id } = params;

  return (
    <div className="max-w-6xl mx-auto">
      <BookDetail bookId={id} />
    </div>
  );
}
