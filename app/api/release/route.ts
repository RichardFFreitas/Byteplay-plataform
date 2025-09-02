export async function GET(request: Request) {
  const githubToken = process.env.GITHUB_TOKEN;
  const url = process.env.GITHUB_RELEASE;
  if (!url) {
    return new Response(JSON.stringify({ error: "URL de release do GitHub não definida" }), { status: 500 });
  }
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Erro ao buscar releases do GitHub" }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro interno do servidor" }), { status: 500 });
  }
}