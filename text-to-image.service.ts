export const textToImageService = async (text: string) => {
    const request = await fetch(`/api/text-to-image/`, {
        method: 'POST',
        body: JSON.stringify({ prompt: text })
    });
    const response: { image: string, id: string } = await request.json();
    return response;
}