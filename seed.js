const Hamoni = require("hamoni-sync");
const https = require("https");

const accountId = "7a70dd40-6cad-41bd-90cb-fa4e2e5b6805";
const appId = "50277df707ce4ea0b08868385f31a2f8";
let hamoni;

const data = JSON.stringify({ accountId, appId });

const options = {
  hostname: "api.sync.hamoni.tech",
  path: "/v1/token",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", token => {
    hamoni = new Hamoni(token);

    hamoni
      .connect()
      .then(response => {
        hamoni
          .createList("datagrid", [
            { firstName: "James", lastName: "Darwin" },
            { firstName: "Jimmy", lastName: "August" }
          ])
          .then(() => console.log("create success"))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  });
});

req.on("error", error => {
  console.error(error);
});

req.write(data);
req.end();
