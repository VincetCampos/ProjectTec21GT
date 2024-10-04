# Usar una imagen base oficial de Node.js
FROM node:16

# Crear un directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]