import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, preferredMethod } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Attempt delivery via FormSubmit to Dani's verified Gmail
    try {
      await fetch("https://formsubmit.co/ajax/Daziikroos61@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Dani-Portfolio/1.0",
        },
        body: JSON.stringify({
          _subject: `New Project Commission Inquiry: [${projectType || "General"}] from ${name}`,
          _replyto: email,
          _captcha: "false",
          _template: "table",
          "Client Name": name,
          "Client Email": email,
          "Creative Domain": projectType || "General Design",
          "Preferred Channel": preferredMethod || "Email",
          "Project Scope": message || "No message provided",
          "Submission Time": new Date().toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" }),
        }),
      });
    } catch (err) {
      console.warn("Background email forward notification:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry processed successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
