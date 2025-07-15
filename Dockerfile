FROM nginx:alpine

# Copy cấu hình Nginx custom
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy mã web vào thư mục gốc Nginx
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
