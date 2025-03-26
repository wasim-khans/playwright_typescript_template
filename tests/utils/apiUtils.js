class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async loginAndReturnToken() {
        let loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad,
            headers: { 'Content-Type': 'application/json' }
        });

        if (loginResponse.ok()) {
            loginResponse = await loginResponse.json();
            return loginResponse.token;
        } else {
            throw new Error("Login failed");
        }
    }

    async createOrder(orderPayLoad, userToken) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        return { orderId: orderResponseJson.orders[0] };
    }
}

module.exports = { APiUtils };
