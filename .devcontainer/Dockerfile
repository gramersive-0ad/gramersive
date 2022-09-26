ARG VARIANT=latest

FROM alpine:${VARIANT}

RUN apk add --no-cache yarn

RUN addgroup -S gramersive
RUN adduser -s/bin/ash -Ggramersive -S gramersive