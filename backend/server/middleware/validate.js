export function validateBody(schema) {
    return function validateBodyMiddleware(req, _res, next) {
        const parsed = schema.parse(req.body);
        req.body = parsed;
        next();
    };
}
