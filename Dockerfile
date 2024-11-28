# Escolher uma imagem base que contenha Node.js
FROM node:20

# Criar um diretório no container para armazenar o código
WORKDIR /app

# Copiar o package.json e instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código da aplicação para o container
COPY . .

# Etapa 6: Compilar o código TypeScript (se for necessário para o seu código)
RUN npm run build

# Expor a porta que o Parse Server irá rodar
EXPOSE 3000

# Rodar o Parse Server
CMD ["npm", "start"]
