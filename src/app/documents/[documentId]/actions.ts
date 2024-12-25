'use server';
import { ConvexHttpClient } from 'convex/browser';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  const { sessionClaims } = await auth();

  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const nameToNumber = (name: string) => {
    const num = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return num;
  };

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl,
    color: `hsl(${nameToNumber(user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous') % 360}, 80%, 60%)`,
  }));

  return users;
}

export async function getDocuments(ids: Id<'documents'>[]) {
  return await convex.query(api.documents.getByIds, { ids });
}
