export default async function fetcher(fetchUrl){
    const response = await fetch(fetchUrl);
    return await response.text();
}