export async function fetchAnova(groups: Record<string, number[]>) {
  const response = await fetch('http://localhost:5001/anova', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groups })
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ANOVA results from API');
  }
  return await response.json();
} 