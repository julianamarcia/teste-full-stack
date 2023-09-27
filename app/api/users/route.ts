import UserModel from './../../../models/userModel';
import { NextResponse } from "next/server";
import startDb from "../../../lib/db";

interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    return NextResponse.json(
      { error: "Email invalid!"},
      { status: 422 }
    );
  }
  if(body.password.length < 5) {
    return NextResponse.json(
      { error: "Password has to have 6 or more digits!"},
      { status: 422 }
    );
  }
  await startDb();
  const oldUser = await UserModel.findOne({ email: body.email });
  
  if (oldUser)
    return NextResponse.json(
      { error: "E-mail is already in use!"},
      { status: 422 }
    );

  const user = await UserModel?.create({ ...body });

  return NextResponse.json({
    user: {
      id: user?._id.toString(),
      email: user?.email,
      name: user?.name,
    }
  });
};