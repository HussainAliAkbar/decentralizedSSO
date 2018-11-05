Project Structure

There are 3 projects in this repository:
1. Root Directory contains the code for the 3rd party service.
2. Web Directory contains the code for the frontend.
3. Blockchain Directory contains the code for the Blockchain service.

Project Setup

1. run "npm install" in all the 3 projects separately.
2. run the 3rd party service project with "npm start".
3. run the web project with "npm start".
4. run the Blockchain project with "docker-compose up" (Docker and Docker-compose).

Code Improvements:

1. Automate the mining and consensus protocols so that they do not need to be performed manually.
2. Replace Proof of Work with Proof of Stake to remove redundant mining.
3. Change normal array structure with Merkle Trees (Hash Trees).
4. Add validation that a consumer cannot create a serviceRegistration transaction for another consumer.
5. Add validation that a service cannot create a serviceRegistration transaction.
6. Restrict keys with weaker encryption methods such as MD5 and SHA-1.

Idea Improvements:

1. Client and Admin SDK that will automate the fetching and sending api calls
2. Client Utility/ Browser Extension that will manage the public and private keys as well as the encryption/decryption tasks.
3. Currency generated on the blockchain can be leveraged to pay the 3rd party services who use the SSO (not sure how though).
4. We can also utilize the concept of "permissions" with our flow.
5. Decryption should be done on the server.
