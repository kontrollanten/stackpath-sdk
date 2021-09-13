const fetch = require('node-fetch');

module.exports = class StackpathSdk {
  accessToken = null;
  clientId = null;
  clientSecret = null;

  constructor({
    clientId,
    clientSecret,
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  auth = async () => {
    return fetch('https://gateway.stackpath.com/identity/v1/oauth2/token', {
      body: JSON.stringify({
        client_id: await this.clientId,
        client_secret: await this.clientSecret,
        grant_type: 'client_credentials',
      }),
      method: 'post',
    })
      .then(result => {
        if (!result.ok) {
          throw Error(`Responses status ${result.status}: ${result.statusText}`);
        }

        return result
      })
      .then(resp => resp.json())
      .then(({ access_token }) => {
        this.accessToken = access_token;
      });
  }

  getIpList = () => {
    return fetch('https://gateway.stackpath.com/cdn/v1/ips', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(resp => resp.json())
      .then(resp => resp.results);
  }
}
