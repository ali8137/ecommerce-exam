import axios from "axios";
import { NextResponse } from "next/server";


const backendApiUrl: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';

export async function GET(req: Request) {
    const token: string = req.headers.get('Authorization')?.split('Bearer ')[1] || '';

    const { searchParams } = new URL(req.url)
    const categoryName = searchParams.get('categoryName')

    // console.log("token", token as string);

    if (!token) {
    //   return new Response('Unauthorized', { status: 401 });
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await axios(
      `${backendApiUrl}/products${
        categoryName ? `?categoryName=${encodeURIComponent(categoryName)}` : ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.status === 200) {
        return NextResponse.json(response.data, { status: response.status });
    } else {
        return NextResponse.json({ message: 'Failed to fetch products' }, { status: response.status });
    }
}

    