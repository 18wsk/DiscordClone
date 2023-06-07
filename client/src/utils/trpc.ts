import { createTRPCReact } from '@trpc/react-query';
import type { Router } from '../../../server/src/routes/index';

export const trpc = createTRPCReact<Router>();