// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import FirebaseAdmin from '@/models/firebase_admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid, displayName, photoURL, email } = req.body;
  if (uid === undefined || uid === null) {
    res.status(400).json({ result: false, message: 'uid 누락됬습니다.' });
  }
  if (email === undefined || email === null) {
    res.status(400).json({ result: false, message: 'email 누락됬습니다.' });
  }
  try {
    // const addResult = await FirebaseAdmin.getInstance()
    //   .Firebase.collection('members')
    //   .doc(uid)
    //   .set({
    //     uid,
    //     email: email ?? '',
    //     displayName: displayName ?? '',
    //     photoURL: photoURL ?? '',
    //   });
    // const screenName = email.replace('@gmail.com', '');
    // await FirebaseAdmin.getInstance()
    //   .Firebase.collection('screen_names')
    //   .doc(screenName)
    //   .set({
    //     uid,
    //     email,
    //     displayName: displayName ?? '',
    //     photoURL: photoURL ?? '',
    //   });
    const screenName = email.replace('@gmail.com', '');
    const addResult = await FirebaseAdmin.getInstance().Firebase.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firebase.collection('members').doc(uid);
      const screenNameRef = FirebaseAdmin.getInstance().Firebase.collection('screen_names').doc(screenName);
      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        // 이미 추가된 상태
        return false;
      }
      const addData = {
        uid,
        email,
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
      };
      await transaction.set(memberRef, addData);
      await transaction.set(screenNameRef, addData);
      return true;
    });
    if (addResult === false) {
      return res.status(200).json({ result: true });
    }
    return res.status(200).json({ result: true, id: uid });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ result: false });
  }
}
