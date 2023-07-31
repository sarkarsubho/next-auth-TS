import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //  check if the user exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not exits" },
        { status: 400 }
      );
    }

    // check if password is correct

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "invalid Password" });
    }

    //   create token data

    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.eamil,
    };

    // create token

    const token = await jwt.sign(tokendata, process.env.Token_Secret!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}
