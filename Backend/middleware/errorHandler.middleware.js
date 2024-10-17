import {APIError} from '../utilities/APIError.js' 

function errorHandler(err, req, res, next) {
    // Check if the error is an instance of APIError
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            errors: err.errors,
            success: err.success
        });
    }

    // Default to 500 if the error is not an instance of APIError
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        errors: [err.message],
        success: false
    });
}

export {errorHandler};