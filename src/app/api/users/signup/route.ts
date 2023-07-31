import { connect } from "@/dbConfig/dbConfig";
import  {User}  from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect(); 

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    // console.log("reqBody",reqBody);

    // //    check if user is already present or not

    let user=await User.findOne({email})

    if (user) {
      NextResponse.json({ message: "user already exits" }, { status: 400 });
    }
    // hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let newUser = await User.create({ username, email, password:hashedPassword});

    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
