'use client';

import { trpc } from '@/utils/trpc';

export function HelloWorld() {
    const hello = trpc.hello.useQuery({ name: 'tRPC' });

    if (!hello.data) return <div>Loading...</div>;

    return <div>{hello.data}</div>;
}

