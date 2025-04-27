import Link from "next/link";
import Image from "next/image";
import logoImg from '@public/imgs/logo.png';
import logoStyle from './logo.module.scss';

export default function Logo() {
  return (
    <div className={logoStyle['logo']}>
      <Link href={'/'}>
        <Image src={logoImg} alt="logo" />
      </Link>
    </div>
  )
}
