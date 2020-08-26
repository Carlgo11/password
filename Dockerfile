FROM alpine
RUN apk add --no-cache nginx
COPY --chown=nobody ./ /password
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /password
RUN rm nginx.conf LICENSE README.md
EXPOSE 8080
USER nginx
CMD nginx; tail -F /dev/null