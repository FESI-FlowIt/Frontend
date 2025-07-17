import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/auth/Logo';
import SocialLoginCard from '@/components/auth/SocialLoginCard';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-40">
      <header className="mb-20">
        <Logo />
      </header>
      <main className="w-600 sm:w-full sm:max-w-343 md:w-full md:max-w-600">
        <LoginForm />
      </main>
      <footer>
        <SocialLoginCard mode="login" />
      </footer>
    </div>
  );
}
