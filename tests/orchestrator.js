import retry from "async-retry";

async function waitForAllServices() {
  await awaitForWebServer();

  async function awaitForWebServer() {
    return retry(fetchStatus, {
      retries: 50,
    });

    async function fetchStatus() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
    }
  }
}

export default {
  waitForAllServices,
};
