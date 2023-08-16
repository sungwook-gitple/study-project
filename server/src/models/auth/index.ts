import { AuthenticateService } from "./authenticateService";
import { UserModel } from '@/src/db/model/user';

const authenticateService = new AuthenticateService(UserModel);

export { authenticateService };