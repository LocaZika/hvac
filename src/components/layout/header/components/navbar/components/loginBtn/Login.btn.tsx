import Link from 'next/link';
import loginBtnStyle from './loginBtn.module.scss';

export default function LoginBtn() {
  return (
    <div className={loginBtnStyle['container']}>
      <Link href={'/login'}>sign in</Link>
    </div>
  )
}
