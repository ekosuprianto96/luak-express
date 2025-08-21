const AppErrorWithCapture = require("./../exceptions/error.exception.js");
exports.validate = async (schema, data) => {
    try {
        return await schema.parseAsync(data);
    } catch (err) {
        throw new AppErrorWithCapture(
            'Missing or invalid data', 
            err.issues[0]?.status || 422,
            (err.issues || []).map((e) => ({ message: e.message, path: e.path[0] }))
        );
    }
}