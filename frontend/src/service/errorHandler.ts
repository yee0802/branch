import axios from "axios";
import { toast } from "sonner";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (err?.data.error) {
      toast.error(err?.data.error);
    }
  }
};
