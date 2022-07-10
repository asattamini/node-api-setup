### Docker build command:

```docker build -t node-server-0.1.1 . ```

### Docker run command:

```docker run -e NODE_ENV=production --restart always -p 127.0.0.1:9999:9999/tcp node-server-0.1.1```
