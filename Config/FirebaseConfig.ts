import admin from "firebase-admin";

const serviceAccount: admin.ServiceAccount = {
  type: "service_account",
  project_id: "wintabox-c037e",
  private_key_id: "090271a0f652405bcbeeb12f4b309479bffa2a76",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGhZ4+CX39EQkR\ndhCxckGKZy711CGZScWUilSCsploapnV8D/Qyh9Hgu/XReGUHcUqt/5Wi9ty1pmr\nwct8i/kTai2ioTi1ETpzcQIQSjuCDchEJ0qRF/jNdRaFDJQvmffHMES2dKX3r9sl\n8XAQRKhe8x6e52oJvvvYVPl9Ys2QLxXr0bJGR9Ym7nhwOMHcJTga+YNEgtYY0Gsi\nfUU0CqV77zFIO8B0HWosxrkOenIt2QiB9CRgwJkt/8IYtZBQJxgoZNC81UCJOLIX\nXN7QpWoZGcrTr5F9MlSFXVkKfPydVbt76z5nTXkLXGU6+K2LwycsjeebdLc0OyN2\nNzsmwI+pAgMBAAECggEAO6Wr/QHHHAFBU0DBFT+6F4aXIn+BNNhoiA/kAnz9ANV+\nsTwFQItqSIc73td9Ro6HTiWIQqK05dU6yNNqe1pnFQFDAukj66tof4UF1LUpGhNg\nB7IyglPMipbSlFlKMN83Bl8nVhbIQxpQYx8ex5SJbjXoDmCDiLgcXUxyxcyo7Nfh\nQclx4susFrHIUj6zxfoT2buovxD7BFxAWktjBh7GJLzgIkFRmST/n8T0smm74PE7\nASPrnJ8CZNDzZHyt+7ED/05f4KYJ8cPinvnATzMLvn36KyzUMfHU3vvgepEoa7MG\neTWKGiV9SNciu66gKHdaWk7ipR9T6XfrRfz2F3iNnQKBgQDss0g/RuZdWSnOuTM6\nFCTuadzF7iovTyMPrOAUVgOiYwFjM2ApSgLl0m72atnmGF0V3sTwV7lpO3BtAJwg\n36Vf9lERXtR3Z6P9M3v9HX/OwvLJwjCh3HUzsTCWyqeefAL0KKTY1b3lOrEQUmvS\nbq3wRfNp9++NNTIvhwcqEWzrZwKBgQDWtW1VJPwoXNgp/nyu3bOVwynxNtyb9CJv\nC20mB+6KgfnEeN4Wq8DhCgDAodp5qnj/Tvc83mqKKaqDtaST0vZXX76M7G25plJp\nAYP8nLqSR+uHlhd4abSuGT0bnIwe+U0HrTBUiqL+vjCH88CWowmAxq7qbgxIFTd1\n1xTDjbTSbwKBgBOKETK4BZg7Hgpkm2f19b6Amqr0KCNTow9ONAk5uH8VMS4hNZTy\n+R5DqslItMgbxsNhalx0wWeAcp1s6XaFP7+WM8b9Twi0U4M5VsjkQIKu8R/ame0i\np8ImpF4uSHv6vLuvBzynGE/t8mPoieILJOyquZdL0kiT1Zq6yMqeOaGNAoGBANTU\n2x//nYVVI2HdRjMAyTe3UigtvdlJ06hHp1Z/nlHmLXQ4a84FSxjIFZ7d0fewqGhM\nGoBX6TwzuTb+I7n08QQDgJuo8cuJtz8npXIO2lKOwEaS3YkbH2NE2XI5aBx7+4OU\nhcgH9TKXzPu3AD1SN+VTDaiMldgOT/+byJVgLtI5AoGBAJhaVpW8SeINqnIikRWs\nNBIPIKt7OA6WpfITvtcENPiMLJHPpBGOtdK1gczyVWjxOD00aNpuWIuvBX+GHcYv\nQTLv/p20fIFca5KCOLAmgualmfiJT4zxrk3Yqt4PXorw7pgYk1DthqK+wpeCuEs3\n7ZVy3rJmKu/vzkcPzGmQiuQN\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-1l0lg@wintabox-c037e.iam.gserviceaccount.com",
  client_id: "117073246444134161522",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1l0lg%40wintabox-c037e.iam.gserviceaccount.com",
} as admin.ServiceAccount;

export default function initializeFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
