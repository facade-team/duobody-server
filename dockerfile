# parent image 불러오기
FROM node:current-slim

# working directory 설정
WORKDIR /home/ubuntu/app

# image 파일시스템 안에 package.json 을 복사
COPY package.json .

RUN npm install

EXPOSE 5000
CMD [ "npm", "start" ]

# 남아있는 소스코드를 image 파일시스템 안에다가 복사
COPY . .