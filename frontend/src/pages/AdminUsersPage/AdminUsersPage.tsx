import React, { FC, useState } from 'react';
import styles from './AdminUsersPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Student } from '../../components/Student/Student';
import { EXAMPLE_USER_ARRAY } from '../../utils/constants';
import { Button } from '../../components/Button/Button';

export const AdminUsersPage: FC = () => {
  const [query, setQuery] = useState('');
  const [studentsData, setStudentsData] = useState(EXAMPLE_USER_ARRAY);
  const [filterResult, setFilterResult] = useState(studentsData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = studentsData.filter(student => {
      if (e.target.value === '') return studentsData
      return (student.cohort.toLowerCase().includes(e.target.value.toLowerCase()) 
      || student.email.toLowerCase().includes(e.target.value.toLowerCase()) 
      || student.name.toLowerCase().includes(e.target.value.toLowerCase()))
    });
    setFilterResult(results);
    setQuery(e.target.value);
  }

  const students = filterResult.map((user, i) => {
    return (<Student key={i} cohort={user.cohort} name={user.name} email={user.email}/>)
  })

  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <NavLink 
          to = '/admin/users' end
          className={({ isActive }) =>
            isActive 
              ? styles.link + ' ' + styles.link_active
              : styles.link
          }
        >
          студенты
        </NavLink>
        <NavLink to = '/admin' end 
          className={({ isActive }) =>
            isActive 
              ? styles.link + ' ' + styles.link_active
              : styles.link
          }
        >
          комментарии
        </NavLink>
      </div>
      <div className={styles.content}> 
        <div className={styles.students}>
          <p className={styles.filter_text}>Фильтровать</p>
          <input 
            className={styles.filter_input}
            type="text" 
            onChange={handleChange}
            value={query}
            placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
          />
          <div className={styles.table_header}>
            <p className={styles.table_header_text}>Номер когорты</p>
            <p className={styles.table_header_text}>E-mail</p>
            <p className={styles.table_header_text}>Имя и фамилия студента</p>
          </div>
          <ul className={styles.students_list}>
            {students}
          </ul>
        </div>
        <div className={styles.upload}>
          <h2 className={styles.upload_heading}>Добавить студентов</h2>
          <p className={styles.upload_text}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
          <Button size='small' >Выберите файл</Button>
        </div>
      </div>
    </section>
  );
}
