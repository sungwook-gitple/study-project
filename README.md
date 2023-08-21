# study-project
회사에서 요구한 스펙으로 구현

### SPEC

NODE 10.24.1  
YARN 1.22.10  
MONGODB 4.2  
mongoose 5.5.23  
node-restful 0.2.6
angular 8

### INSTALL

- MONGODB
  - version: 4.2
    ```shell
      brew update
      brew tap mongodb/brew
      brew install mongodb-community@4.2
      brew services start mongodb-community@4.2
    ```
  - MONGODB 실행 확인
    ```shell
      ps aux | grep -v grep | grep mongod
    ```
  - run
    ```shell
      mongo
    ```
- AEDES
  - 참조
    ```shell
      https://github.com/moscajs/aedes-cli
    ```
  - run
    ```shell
      aedes -c mqtt-server/config/aedes.js
    ```
