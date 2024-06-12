export async function getPrice() {
  try {
    const resp = await fetch('https://interview.switcheo.com/prices.json');
    if (!resp.ok) {
      console.error(resp.status);
      return null;
    }
    return await resp.json();
  } catch (error) {
    console.error(error);
  }
}
