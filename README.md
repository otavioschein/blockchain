## Projeto Blockchain em nodejs
- packages usados:
 - crypto.js
   ```
   npm i crypto-js --save
   ```
 - pg
   ```
   npm install pg
   ```
 - ws
   ```
   npm i ws --save
   ```

## Para rodar a rede em mais um peer:
- primeiro terminal:
    ```
    npm run dev
    ```
- segundo terminal:
    ```
    HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
    ```
- terceiro terminal:
    ```
    HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5002,ws://localhost:5001 npm run dev
    ```
