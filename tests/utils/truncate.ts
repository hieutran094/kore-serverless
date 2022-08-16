import { firestore } from 'firebase-admin'

export default async (db: firestore.Firestore, tableName: string) => {
    const rows = await db.collection(tableName).get()

    const promiseArr: Promise<firestore.WriteResult>[] = []
    rows.forEach((doc) => {
        promiseArr.push(db.collection(tableName).doc(doc.id).delete())
    })
    await Promise.all(promiseArr)
}
