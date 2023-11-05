import { httpStatus } from "@/constants/httpStatus";
import validator from "validator";
export function throwCustomError(message: string = httpStatus.http_message_internal_server_error, status: number = httpStatus.http_status_internal_server_error) {
    const customError = {
        message,
        status
    };

    throw customError;
}

