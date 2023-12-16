'use client';

import { whoAmIQuery } from '../../../lib/graphql/users';
import { WhoAmIQuery } from '../../../types/apolloComponent';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
export default function useGetUser(token: any) {
  const { data: getUser } = useSuspenseQuery<WhoAmIQuery>(whoAmIQuery, {
    skip: !token,
  });

  return {
    getUser,
  };
}
