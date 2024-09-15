import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  const date = new Date(input);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

  return date.toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const convertFileToBase64 = (
  file: File | undefined,
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(undefined);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result as string | undefined);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};
