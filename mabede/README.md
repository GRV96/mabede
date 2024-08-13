# Execute Mabede in a Docker container

Build the Docker image.
```
docker build -t mabede:lastest .
```

Create the Docker container.
The host's port 80 is mapped to the container's port 3000.
```
docker run --name mabede -p 80:3000 mabede:lastest
```

In this variant,
flag `--rm` causes the container's deletion when it is stopped.
```
docker run --name mabede -p 80:3000 --rm mabede:lastest
```

Start the Docker container in attached mode after its creation.
```
docker start mabede -a
```

Stop the Docker container.
```
docker stop mabede
```
