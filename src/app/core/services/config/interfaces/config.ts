import { z } from 'zod';

const schema = z.object({
  apiUrl: z.string(),
  theme: z.string(),
  language: z.string(),
  enableLogs: z.boolean()
});

export type Config = z.infer<typeof schema>;

export function parseDTO(source: unknown) {
  return schema.safeParse(source);
}
