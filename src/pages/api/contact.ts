import type {NextApiRequest, NextApiResponse} from 'next'

// Simulated contact endpoint: no backend involved.
// Returns the same shape the frontend expects (a truthy payload) so the
// contact form keeps showing its success message.
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({error: 'Method not allowed'})
    }

    const {email, message} = req.body || {}
    if (!email || !message) {
        return res.status(400).json({error: 'email and message are required'})
    }

    res.status(200).json({id: Date.now(), email, message})
}
