import * as firebaseAdmin from 'firebase-admin';

const privateKey = process.env['PRIVATE_KEY'];
const clientEmail = process.env['CLIENT_EMAIL'];
const projectId = process.env['PROJECT_ID'];

if (!privateKey || !clientEmail || !projectId) {
	console.log(
		`Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
	);
}

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			projectId: 'normal-board',
			privateKey:
				'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCI60ryutT9CTWi\nuw+WsBCfXFSEkI8yGbpGbPoQK321+ey8WWoQw9AJ5ol9YhbEbGc1rLKk1o/A4san\n63XGsQocUkjUjbq2aoM2lWfayVE6uoquT89hG31krTdReIkqAUKMQZKAXVRhvvDR\n9pb/wZXmOtaIZFLigfP5j/DT0FCweoI4ufKTZzVwGwtZ++6KqfD9ShX9BLNE5gjY\ntUZl2wVsz24aCPVxkyfgw+ONnbkLAM5/j4z3G9lo9DOHxbJbHlvwjc5TZe74pgMK\nsAuToQlO4C4gUFVv+5oEUDGlV3VafQNDrMwRQka9CV6JIbLE66gl9vsweGjGxs68\ny+Y/LHJvAgMBAAECggEABwPJuY6O6Pk20UPfiZXdqXx+gV2H/fDJgArcnkV20a2g\no7RlCxTX129YmJ7qPF1dcFI3w4WRTzg50KfvRyMSOd88B1UiPW75kqtW6yOophH2\nlvWp0fd+63s1vAEpQzNV/dTs35ITMlV+WxN/gFJNDsLxni1IUyiF9RbwfLmjLgIV\nngcwqyP+kTCtGm6vlw7gYFNy+Wfs2kn/xhSW4VjoilNtrCQrmpVznt+ZbF9sJILi\n+bEg2FjmaOTrJQKKDQFgoRz57k/qA6Tg1rEu8SUSxVxPbzarcwVfwP18yzWwUjsj\n6brfC9W46hShmsIVviz1todsJhDKCgqMOioUn1qbkQKBgQC8Tw0TEExyGSe16WG3\nc0FkkgGWfaUIXSm0ZG7+pOgS63RpOTINymmvZ3hiwwTo/3LLgczdVuYPDp364yxA\ngKM+NGXUxc3wtjLp+lgjzNhj4uHFf4amqThfFu6aUABG1aZpYfs1J4QqpWg1FxnQ\nLoOdPJIcbkcmRKQKGw4qB/IByQKBgQC6IybvwI6ZXcS6BaYiBFZelNLh41YkkslP\n2R3s01b8ur5qShfBs9bvKPfq7KN/kANDK2WgzF/eszytQAHxxhdd5QB6NGAU9oTz\n8M1mIz2PJq6seF7xNUC39tEm2LjVoAwjb0TOpNyTTRxerzokZCJDUenWfLBF+kav\nBqn6oD+udwKBgC5MPUmvmyv+VU4beEPzWWORpkRK1fWNekB45PVEtC5ap39raYwM\ndRmEFgwqKJ3kmGPCoQzWXa/cByl1Cx88wWX82gCLNYv2L+RpAZyjs5wzXxEAvqlh\nN5Phfn6AJuFDjCuixHGYKp2Vl15eNKGDniZdiwrkbifRfodhiYT5+R1JAoGAbOpc\nwjVeO4eOsXrUt1rqXvWeX+byZPwvJ7XXuNgBMmjjOraYKBPfVJoYVzKYiO/vuMIP\n+YMdJeajPo0RljNfQOXa3acAAcQuD797sKQ2RSlRVEIq6+FJOVwHDkAKB5ZbA/D7\nxh7ZoqegThciYmDlW5b2yTa0vn2wFoJDvA9AtAkCgYApHqED61hknrD2ujXP2FmT\nP8Igaj6ZNRQmq0/7/dMPAZmejErph759On+ptiiD2bzKMtmrA7GRh4O2idxtTBrf\nTBrjs7GtctXibawWBbRqNomLZwa/AIbKhGkWKCHxDmLCcKMcSVFLmED6haCVQdn6\ncJ9fjmRUAsnZysJkjs4Rvg==\n-----END PRIVATE KEY-----\n',
			clientEmail: 'firebase-adminsdk-fr5kl@normal-board.iam.gserviceaccount.com',
		}),
		databaseURL: `https://${projectId}.firebaseio.com`,
	});
}

export { firebaseAdmin };
