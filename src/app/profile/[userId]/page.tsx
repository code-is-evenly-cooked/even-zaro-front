import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import ProfileTabClient from "@/components/Profile/ProfileTab/ProfileTabClient";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  if (!userId) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <AppErrorBoundary fallbackMessage="프로필 정보를 불러오지 못했습니다.">
        <ProfileHeader profile={profile} />
      </AppErrorBoundary>
      <div className="flex flex-col max-w-3xl mx-auto">
        <ProfileTabClient />
      </div>
    </div>
  );
}
