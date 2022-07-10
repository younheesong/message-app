// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import MemberCtrl from '@/controllers/members.ctrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];
  try {
    if (supportMethod.indexOf(method!) === -1) {
      //error
    }
    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
  }
}
