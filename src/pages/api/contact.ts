import type {NextApiRequest, NextApiResponse} from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body)
        }
        const response = await fetch(`${process.env.BACKEND_URL}/contact/`, options);
        const data = await response.json();
        res.status(200).json(data)

    } catch (error) {
        res.status(error.status || 500).json({error: error.message});
    }
}