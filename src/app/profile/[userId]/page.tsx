import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader.client";
import ProfileTabClient from "@/components/Profile/ProfileTabClient";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  if (!userId) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileHeader />
      <div className="flex flex-col max-w-3xl mx-auto">
        <ProfileTabClient />
      </div>
    </div>
  );
}
