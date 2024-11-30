import { server } from './app';
import { serverConfig } from './server';

server.listen(serverConfig.port,()=>{
    console.log(`App listening on port: ${serverConfig.port}`);
    console.log(`Configuration: ${(JSON.stringify(serverConfig))}`);
});