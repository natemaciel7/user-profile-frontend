import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import avatar from "../assets/default-avatar.png";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    idade: "",
    rua: "",
    bairro: "",
    estado: "",
    biografia: "",
    imagem: null,
  });

  const [usuarios, setUsuarios] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const buscarUsuarios = () => {
    axios
      .get("https://user-profile-backend-xkw3.onrender.com/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData };
      delete payload.imagem;

      await axios.post(
        "https://user-profile-backend-xkw3.onrender.com/usuarios",
        payload
      );

      alert("Dados salvos com sucesso!");

      // Limpar o formulário
      setFormData({
        id: null,
        nome: "",
        idade: "",
        rua: "",
        bairro: "",
        estado: "",
        biografia: "",
        imagem: null,
      });

      // Atualizar a lista
      buscarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar os dados");
    }
  };

  // Editar usuário
  const handleEditar = (usuario) => {
    setFormData({ ...usuario, imagem: null });
  };

  const handleExcluir = async (id) => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirmacao) return;

    try {
      await axios.delete(
        `https://user-profile-backend-xkw3.onrender.com/usuarios/${id}`
      );

      alert("Usuário excluído com sucesso!");
      buscarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir");
    }
  };

  return (
    <>
      <form className="profile-container" onSubmit={handleSubmit}>
        <div className="profile-picture">
          <img
            src={
              formData.imagem ? URL.createObjectURL(formData.imagem) : avatar
            }
            alt="Foto de perfil"
          />
          <input type="file" name="imagem" onChange={handleChange} />
        </div>

        <div className="inputs-row">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
          />
        </div>

        <div className="inputs-row">
          <input
            type="text"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </div>

        <div className="textarea-group">
          <label>Biografia</label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="save-button" type="submit">
          Salvar
        </button>
      </form>

      <div className="list-container">
        <h2>Usuários cadastrados</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Endereço</th>
              <th>Estado</th>
              <th>Biografia</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.idade}</td>
                <td>
                  {u.rua}, {u.bairro}
                </td>
                <td>{u.estado}</td>
                <td>{u.biografia}</td>
                <td>
                  <button onClick={() => handleEditar(u)}>Editar</button>
                  <button
                    onClick={() => handleExcluir(u.id)}
                    style={{ marginLeft: "0.5rem", color: "red" }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
