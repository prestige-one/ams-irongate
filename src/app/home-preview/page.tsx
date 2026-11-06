import type { Metadata } from 'next';
import { HomePage } from '@/components/home-page';

export const metadata: Metadata = { title: 'Home Preview — AMS Irongate', robots: { index: false, follow: false } };
export default function HomePreview() { return <HomePage comparison />; }
