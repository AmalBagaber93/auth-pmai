import { UseFormSetError } from "react-hook-form";

export function setFormErrors(setError: UseFormSetError<any>, data: any) {
    if (data?.errors) {
        Object.keys(data.errors).forEach((key) => {
            setError(key, {
                type: "server",
                message: Array.isArray(data.errors[key]) ? data.errors[key][0] : data.errors[key],
            });
        });
    }
}
