FROM ubuntu

ENV CONTAINER_VERSION = 1.0
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install libseccomp-dev gcc cmake git nodejs npm -y
RUN npm i -g typescript
RUN git clone https://github.com/QingdaoU/Judger.git
WORKDIR /Judger
RUN mkdir build && cd build && cmake .. && make && make install
WORKDIR /
RUN mkdir DY_Algorithm
WORKDIR /DY_Algorithm
COPY ./ ./

ENTRYPOINT [ "sh", "START.sh" ]