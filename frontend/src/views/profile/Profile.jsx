import { useContext, useState } from "react";
import UsersContext from "../../context/UsersContext";
import styles from '../../styles/Profile.module.css'

function Profile() {
  const [file, setFile] = useState(null);

  const { user, submitProfilePhoto, submitProductPhoto, submitDoc } =
    useContext(UsersContext);

  function handleSubmitProfilePhoto(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("profile", file);
    submitProfilePhoto(data);
    setFile(null);
  }

  function handleSubmitProductPhoto(e) {
    e.preventDefault();

    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append("product", file[i]);
    }
    submitProfilePhoto(data);
    setFile(null);
  }

  function handleSubmitDoc(e) {
    e.preventDefault();

    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append("document", file[i]);
    }
    submitProfilePhoto(data);
    setFile(null);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cargar archivos</h2>
      <form onSubmit={handleSubmitProfilePhoto} className={styles.formContainer}>
        
       <h3 className={styles.subtitle}>Foto de perfil</h3>
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Post</button>
      </form>

      <form onSubmit={handleSubmitProductPhoto} className={styles.formContainer}>
      <h3 className={styles.subtitle}>Fotos de productos</h3>
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          multiple
          onChange={(e) => setFile(e.target.files)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Post</button>
      </form>

      <form onSubmit={handleSubmitDoc} className={styles.formContainer}>
      <h3 className={styles.subtitle}>Documentos</h3>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setFile(e.target.files)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Post</button>
      </form>
    </div>
  );
}

export default Profile;
