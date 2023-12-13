import jwt from 'jsonwebtoken';
import { poolConnect } from '../../config/db.mjs';
const pool = await poolConnect('KHONLINE');
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
            try{
                const params = {
                    MATK: decodedToken.userId
                }
                const result = await pool.executeSP('SP_KTTK_ALL', params);
                if(result[0][0].ROLE != decodedToken.userRole){
                    return res.status(401).send('Wrong ROLE');
                }
                
            }catch(error){
                return res.status(401).send('Wrong ID or the account is blocked');
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