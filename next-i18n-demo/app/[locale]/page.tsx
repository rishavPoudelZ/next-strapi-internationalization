type Locale = "en" | "ko";

const CTA_TEXT: Record<Locale, { title: string; description: string; button: string }> = {
  en: {
    title: "Work With Us",
    description: "We are always open to partnerships and collaborations!",
    button: "Contact Us",
  },
  ko: {
    title: "함께 일하기",
    description: "저희는 항상 파트너십과 협업에 열려 있습니다!",
    button: "문의하기",
  },
};



async function getPage(locale: string) {
  const res = await fetch(
    `http://localhost:1337/api/pages?locale=${locale}&populate=*`,
    { cache: "no-store" }
  );
  const data = await res.json();

  console.log("FULL RAW RESPONSE:", data);

  // Return the first page
  return data.data?.[0] || null;
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await getPage(locale);

  console.log("PAGE DATA:", page);

  if (!page) {
    return <p className="text-center py-10">Page not found.</p>;
  }

  return (
    <section className="space-y-10">

      {/* HERO SECTION */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-md">
        <img
          src="/hero-bg.jpg"
          alt="Company"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold tracking-wide text-center px-4">
            {page.title ?? "No Title Found"}
          </h1>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="prose prose-lg max-w-none leading-relaxed">
        {page.content ? (
          <p>{page.content}</p>
        ) : (
          <p>No content available.</p>
        )}
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">{CTA_TEXT[locale]?.title}</h2>
        <p className="mb-4">{CTA_TEXT[locale]?.description}</p>
        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-300 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
          {CTA_TEXT[locale]?.button}
        </button>
      </div>
    </section>
  );
}
