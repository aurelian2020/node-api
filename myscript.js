const oracledb = require('oracledb');

let clientOpts = {};
if (process.platform === 'win32') {
  // Windows
  // If you use backslashes in the libDir string, you will
  // need to double them.
  clientOpts = { libDir: 'D:\\oracle\\11' };
}
// enable node-oracledb Thick mode
oracledb.initOracleClient(clientOpts);

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "websitp"  // set mypw to the hr schema password

async function run() {

    const connection = await oracledb.getConnection ({
        user          : "web_sitp",
        password      : mypw,
        connectString : "(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=exa-scan)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=ITPNOU)))"
    });

    const result = await connection.execute(
        `SELECT id, user_aplic, name
         FROM gate
         WHERE id = :id`,
        [103],  // bind value for :id
    );

    console.log(result.rows);
    await connection.close();
}

run();