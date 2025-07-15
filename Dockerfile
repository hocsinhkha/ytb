FROM nginx:alpine

# Copy file cấu hình Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy toàn bộ mã web vào nginx web root
COPY . /usr/share/nginx/html

# Mặc định Nginx listen ở 80, Render sẽ map tới cổng public
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
