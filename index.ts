import { AppTheme } from "@/ui";
import "expo-router/entry";

declare module '@/ui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Register extends AppTheme {}
}
