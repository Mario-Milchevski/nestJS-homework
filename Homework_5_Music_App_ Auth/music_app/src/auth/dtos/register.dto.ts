import { Role } from "src/common/enums/role.enum";
import { LoginDto } from "./login.dto";


export class RegisterDto extends LoginDto {

    role: Role;

}