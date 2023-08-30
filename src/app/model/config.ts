interface ConfigInterface {
    url:string;
    token:string;
  }
  class Config implements ConfigInterface {
    url:string="http://localhost:8080";
    token:string="token";
    constructor () {
    }
  }