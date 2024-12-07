import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  const { slug } = params;
  const { searchParams } = new URL(request.url); // `request.url` je sada string iz `NextRequest`
  const locale = searchParams.get('locale') || 'sr-Latn';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REST_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.data?.length === 0) {
      return NextResponse.json(
        { error: `No blog found for slug: ${slug} and locale: ${locale}` },
        { status: 404 }
      );
    }

    return NextResponse.json(data.data[0]); // Vraćamo pojedinačni blog
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
