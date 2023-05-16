# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta em que o aplicativo Nest.js estará escutando
EXPOSE 3001

# Define o comando padrão para iniciar a aplicação
CMD [ "npm", "run", "start:dev" ]