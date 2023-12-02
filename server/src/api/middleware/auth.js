import jwt from 'jsonwebtoken';

const authMiddleware = {
    authenticateToken: async (req, res, next) => {
        // Kiểm tra xem header "Authorization" có tồn tại không
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(401).send('Khong tim thay access token!');
        }

        // Trích xuất token từ header "Authorization"
        const accessToken = authorizationHeader.replace('Bearer ', '');
        try {
            const secret = process.env.ACCESS_TOKEN_SECRET_KEY;

            const decodedToken = jwt.verify(accessToken, secret);
            if (!decodedToken.userId || !decodedToken.userRole) {
                return res.status(401).send('Unauthorized!');
            }
            req.userId = decodedToken.userId;
            req.userRole = decodedToken.userRole;
            next();
        }catch(error){
            res.status(500).send(error.message);
        }
    }
};
export default authMiddleware;