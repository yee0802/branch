import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (err?.data.error) {
      toast.warning(err?.data.error);
    }
  }
};
