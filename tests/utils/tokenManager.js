const { APiUtils } = require('./apiUtils');
const { request } = require('@playwright/test');
require('dotenv').config();

class TokenManager {
    static tokens = {}; 

    static async getToken(role) {
        if (!this.tokens[role]) {
            const apiContext = await request.newContext();
            const loginPayload = {
                admin: { userEmail: process.env.ADMIN_EMAIL, userPassword: process.env.ADMIN_PASSWORD },
                customer: { userEmail: process.env.CUSTOMER_EMAIL, userPassword: process.env.CUSTOMER_PASSWORD }
            }[role];

            if (!loginPayload) throw new Error(`Invalid role: ${role}`);

            const apiUtils = new APiUtils(apiContext, loginPayload);
            this.tokens[role] = await apiUtils.loginAndReturnToken();
        }
        return this.tokens[role];
    }
}

module.exports = { TokenManager };
