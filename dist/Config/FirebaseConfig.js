"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = {
    type: "service_account",
    project_id: "wintabox-app",
    private_key_id: "729c3cffe0d347f7697093f66122cbd606c11862",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCKEveq+50NCHAv\nY/+T2CwpWW4ePByZKBA0zaYWpmO9EQIW/6iNLF1fDpbr+u6Weh/k9FuaipqDkgZd\ndxhoO1hFJy57b8gdReAuenlG89a9g2dEheS3Px31dhOOaTFMd9mfeYNRMSGqggri\nm42PjRuKGbrVH27dD4XhyC+ASvNRbDcU/YMwyvFk1vwnjFEHw+o+ktY7jj9w1sC4\nIXRXi9T5qt2WpwZMNZnmaw1LfMsLLyrnlSR45ExWuOliU6I1WMyQBRXJ+UqFNDKh\nzkYDxr/BYuf2HuJ17EAP0ppXCXVo80LiOzPTBrJ6aCAEe35qGmcNoAD23IHXCKG1\ngw/jkiSvAgMBAAECggEAGZkGnYZkSWRFGCQb39b16PyRc72FN8e7qW5u2kgiuYyL\nrKPdJb8R2GumAz3UOcWOYC4FRZNorffGglFwDvLhnIB1F6FTokmwFC3UihjuuNfB\nr2x7SJXFAhrP6VkLMLgPeodWlxjauve8+OIJzpFEh8fZYWWgcg9MrN0mIUzD61Y0\n65qt8+Nvw4C8VZT9zZdESx4gjS3Q3wRhGajVCJLMDUQXaEbr9XXtuzTAg+p4emte\n+/fxAEAD8pDK6qa507mYAAQncIr5qMnN5KDueSP+1Ru/8ix06aTotpTuqvOrENW7\niPFN6Y9tAMRAM+7nWSxPvwexZL2FYm2qS+XQY5G3YQKBgQDBGVSwNXcDte4wX3Od\n6nmyEUZeNOy/Qd6W9l7DpmtKNnKPpfL778OfMTGY0r6v6LvAr0HeofsQ8SJP5/z8\nYMGofFEMzdUNqJbUGtwlu8g1exn8LVT+Yr2O+YjSVr7w0joX65SeET3Vcg4nHElo\n2rArbG4xLG8ygoRFat2MC1r4RwKBgQC3DRJaEgMRvDcNo75y7E0AzAfqB2x81j0P\nNTmtwS+dbeIyy1xCD+Eei4mx+1sG2LWLhkO+sVfNkWXwVwhiRUjklJBaoyzqD9N2\naU3Xa3dbGMLvnuSgevoNLGtMXXSSvLd5dLc2VX+9IO9LtURuIv8Cda0FFq5UQvb3\nP9BzFf2MWQKBgDUkN35W+G34/5gobLUk9mDfCDKc9hqckhmRq/rELfq6iUSnMvvK\nvFdvPmsEdJ4Mur8IfGQ8x8+dzQeYnLMIHcO0ksmnS976aqfszHFGAI9XVYtlHmLz\n4Z8bZWAdp2a3NG2o07m8nPvE68gvrLRCmwEYUisOQ3vvF1/TTS1hYqO5AoGBAIQU\ncoF7LavGWxMEa48Q4h8JGUzMPoN1MmmexheRpYG6n9R22ALy4kTf+mLqMywlghlC\nr+8Ql4JEv4FDy1DdHVORvvcndmkNMk/me7xMVrrsivvLcrw4/+QxgNqBNHQMp3aD\nuQ8DckBNW10NVmsB5W8o6ccaLn+uMfUFnqrr2x9BAoGBAJZknqmrRJE4g4t9aE3p\n/vHPeduObLxQCN5gV30B1Ip51buPpIHGCEntVghwLUBPIaj/WjLupqIWDmXUUAu4\nguaSIOy47II7KRO6OcsJLqVoaDqTskFzD+urjogGZkz+I0+FhIzGXB++s9GJIC0e\nBmSP5grKANirw69OtL9Kd+5c\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-790nk@wintabox-app.iam.gserviceaccount.com",
    client_id: "113164100719405649553",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-790nk%40wintabox-app.iam.gserviceaccount.com",
};
function initializeFirebase() {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
    });
}
exports.default = initializeFirebase;
