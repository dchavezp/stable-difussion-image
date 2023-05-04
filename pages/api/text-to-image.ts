import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import cloudinari from "cloudinary"
interface GenerationResponse {
    artifacts: Array<{
        base64: string
        seed: number
        finishReason: string
    }>
}
const cloudinariApi = cloudinari.v2;

cloudinariApi.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ image: string, id: string }>
) {
    const engineId = 'stable-diffusion-v1-5'
    const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
    const apiKey = process.env.STABILITY_API_KEY

    const { prompt } = JSON.parse(req.body);

    if (!apiKey) throw new Error('Missing Stability API key.')

    const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: prompt,
                    },
                ],
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: 512,
                width: 512,
                samples: 1,
                steps: 30,
            }),
        }
    )

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }
    const responseJSON = (await response.json()) as GenerationResponse
    const imageid = uuidv4();
    const { secure_url } = await cloudinariApi.uploader.upload(`data:image/png;base64,${responseJSON.artifacts[0].base64}`, { public_id: imageid.substring(0, 6) })

    // var buf = Buffer.from(responseJSON.artifacts[0].base64, 'base64');
    // const filePath = path.join(process.cwd(), 'public', 'generated.png')
    // await writeFile(filePath, buf)

    // const file = fs.readFileSync(filePath);
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
    // console.log(path.basename(filePath))
    res.status(200).json({ image: secure_url, id: imageid.substring(0, 6) });
    //make a download api route nextjs
}