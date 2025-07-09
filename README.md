# 🧾 Perfil de Usuário

Aplicação fullstack para cadastro, listagem, edição e exclusão de perfis de usuário com imagem, nome, idade, endereço e biografia. Integração com banco de dados via API REST

---

## Tecnologias

- **Frontend:** React.js, Axios, HTML/CSS
- **Backend:** Node.js, Express, MySQL, Dotenv
- **Banco de Dados:** MySQL (Clever Cloud)
- **Deploy:** Vercel (frontend) + Render (backend)

---

## Deploy

- Frontend: [https://user-profile-frontend-omega.vercel.app/]
- Backend: [https://user-profile-backend-xkw3.onrender.com]

---

## Como rodar localmente

### Backend

cd user-profile-backend
npm install
Crie um .env com:

DB_HOST=seu_host
DB_USER=seu_user
DB_PASSWORD=sua_senha
DB_NAME=perfil_usuarios
PORT=3001

- Crie a tabela:

CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255),
idade INT,
rua VARCHAR(255),
bairro VARCHAR(255),
estado VARCHAR(255),
biografia TEXT,
imagem TEXT
);
Inicie o servidor:

npm run dev

### Frontend

cd user-profile-frontend
npm install
npm start
Edite o arquivo UserProfile.jsx para apontar para a URL do backend (localhost ou Render).

📬 Contato
Natália Maciel
[linkedin.com/in/nataliamaciel7](https://www.linkedin.com/in/nataliamaciel7/)
