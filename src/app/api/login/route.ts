import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch user
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const userData = userSnap.data();

    // 2️⃣ Check account active
    if (!userData.isActive) {
      return NextResponse.json(
        { error: "Your plan is inactive. Please activate your plan." },
        { status: 403 }
      );
    }

    // 3️⃣ Verify password
    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4️⃣ Create session token
    const token = crypto.randomUUID();

    // 5️⃣ Store session (VERY IMPORTANT)
    await setDoc(doc(db, "sessions", token), {
      email,
      createdAt: serverTimestamp(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    });

    // 6️⃣ Prepare SAFE user object (NO password)
    const safeUser = {
      email,
      shopId: userData.shopId,
      shopName: userData.shopName,
      plan: userData.plan,
      isActive: userData.isActive,
    };

    // 7️⃣ Send response + cookie
    const res = NextResponse.json({
      message: "Login successful",
      user: safeUser,
    });

    res.cookies.set("sessionToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
