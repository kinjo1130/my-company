import CareerDetail from '@/components/CareerDetail';
import { SITE, OWNER } from '@/lib/constants';

export const metadata = {
  title: `経歴 | ${SITE.NAME}`,
  description: `${OWNER.NAME}の詳しい経歴`,
};

export default function CareerPage() {
  return <CareerDetail />;
}
