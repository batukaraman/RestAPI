import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            let decodedData = null;
            if (token) {
                decodedData = jwt.verify(token, process.env.SECRET_KEY);
                req.userId = decodedData?.id;
            } else {
                decodedData = jwt.decode(token);
                req.userId = decodedData?.sub;
            }

            next();
        } else {
            throw Error("Yetkilendirme başarısız.")
        }
    } catch (error) {
        console.log("Hata");
        return res.status(500).send({errors: [error.message]});
    }
}