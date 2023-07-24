import {PrismaClient} from '@prisma/client';

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const {conversation, user, filter, profileCheck, skill, timezone} = prisma;
