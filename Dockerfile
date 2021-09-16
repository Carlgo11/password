FROM alpine
RUN apk add --no-cache nginx
RUN chown -R nginx:nginx /var/lib/nginx/
USER nginx
COPY --chown=nginx ./ /password
COPY --chown=nginx ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /password
RUN rm nginx.conf LICENSE README.md
RUN chmod 700 -R .
EXPOSE 8080
CMD nginx
