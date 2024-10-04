# Usar la imagen oficial de Node.js como base
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar PM2 globalmente
RUN npm install -g pm2

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto en el que tu aplicación se ejecuta
EXPOSE 4000

# Comando para ejecutar tu aplicación usando PM2
CMD ["pm2-runtime", "start", "server.js"]