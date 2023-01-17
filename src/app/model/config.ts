interface TestInterface {
    config: string;
  }
  interface TestWithConsturctor {
    new(): { config: string };
  }
  class Config implements TestInterface {
    public config: string;
    constructor () {
      this.config = "";
    }
  }
  function setTheState(n: TestWithConsturctor) {
    return new n();
  }
  console.log(setTheState(Config).config);