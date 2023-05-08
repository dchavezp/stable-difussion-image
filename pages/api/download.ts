import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const { imageId, resolution } = req.query;
    res.redirect(`http://res.cloudinary.com/devvitt/image/upload/c_scale,f_png,w_${resolution}/${imageId}`);
}

export const config = {
    api: {
        method: 'GET',
    },
};