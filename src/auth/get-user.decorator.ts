import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, req): any =>
{
    console.log(req.args)

    return req;
});