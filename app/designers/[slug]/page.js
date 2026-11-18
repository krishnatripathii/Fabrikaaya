import { designers } from '@/data/designers';
import DesignerProfileClient from './DesignerProfileClient';

export function generateStaticParams() {
  return designers.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const designer = designers.find((d) => d.slug === slug);
  if (!designer) {
    return {
      title: 'Designer Not Found — Fabrikaaya',
    };
  }
  return {
    title: `${designer.name} — Fabrikaaya`,
    description: designer.bio,
  };
}

export default async function DesignerProfilePage({ params }) {
  const { slug } = await params;
  return <DesignerProfileClient slug={slug} />;
}
