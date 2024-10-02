export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-properties?category=${queryParams.category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return new Response("Network response was not ok", {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
