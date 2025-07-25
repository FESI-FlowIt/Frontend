import SignUpForm from '@/components/auth/SignUpForm';
import SocialLoginCard from '@/components/auth/SocialLoginCard';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen scale-90 flex-col items-center justify-center gap-40">
      <header className="text-display-32 mb-40 text-black">회원가입</header>
      <main className="w-600 sm:w-full sm:max-w-343 md:w-full md:max-w-600">
        <SignUpForm />
      </main>
      <footer>
        <SocialLoginCard mode="signUp" />
      </footer>
    </div>
  );
}
