FROM nginx:alpine

# Copy config nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy mã nguồn vào nginx
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
