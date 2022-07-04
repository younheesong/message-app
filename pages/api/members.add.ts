// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import MemberModel from '@/models/meber/member.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, displayName, photoURL, email } = req.body;
  if (uid === undefined || uid === null) {
    res.status(400).json({ result: false, message: 'uid 누락됬습니다.' });
  }
  if (email === undefined || email === null) {
    res.status(400).json({ result: false, message: 'email 누락됬습니다.' });
  }
  const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
  if (addResult.result === true) {
    return res.status(200).json(addResult);
  }
  return res.status(500).json(addResult);
}
