import React, { FC } from "react";
import ProfileEditPageStyles from './ProfileEditPage.module.css';
import { Input } from "../../components/Input/Input";
import { ProfileContext } from "../../services/profileContext";

export const ProfileEditPage: FC = () => {
  const [inputs, setInputs] = React.useContext(ProfileContext);
  const [nickname, setNickname] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');

  // Ниже приведены примеры функций для изменения значения инпутов text, textarea, file
  // Также возможно записывать все инпуты в контекст

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const changeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.value;
    console.log(file);
    
    if (file) {
      setInputs({ ...inputs, file: file });
    }
  }

    return (
      <>
        <h1>
            Страница редактирования профиля
        </h1> 
        {/* Использование инпутов для примера ниже. 
        Для типов text, textarea, file - прописываем значение и функцию изменения значения в пропсах 
        Для типов date и select - вся логика прописана внутри и снаружи достается через контекст*/}
        <div className={ProfileEditPageStyles.div}>
          <Input type='text' label='Ник на гитхабе' value={nickname} onChange={changeNickname} />
          <Input type='select' label='Выберите город *' />
          <Input type='textarea' value={bio} onChange={changeBio} label='Из какой сферы пришёл? Кем работаешь?' />
          <Input type='date' label='Дата рождения *' />
          <Input type='file' label='Семья, статус, домашние животные' value={inputs.file} onChange={uploadFile} />
        </div>
      </>
    );
  }
