import React, { FC, useState, useEffect } from 'react';
import api from '../../utils/api-config';
import styles from './AdminUsersPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Student } from '../../components/Student/Student';
import { EXAMPLE_USER_ARRAY } from '../../utils/constants';
import { Button } from '../../components/Button/Button';
import { IStudentsData } from '../../services/types/data';


export const AdminUsersPage: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [studentsData, setStudentsData] = useState<IStudentsData[]>([]);
  const [filterResult, setFilterResult] = useState<IStudentsData[]>([]);

  useEffect( () => {
    const fetchUsers = async () => {
      await api.getUsers('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNtdGhPZlZhbHVlQHlhbmRleC5ydSIsInJvbGUiOiJjdXJhdG9yIiwiaWF0IjoxNjgxNDcxNjE0LCJleHAiOjE2ODIwNzY0MTR9.pAZhCpunPy7S8kz3RNheSoZKyj7tZi-Y78wYaycf82Y', 0, 20, '')
        .then(data => {
          setStudentsData(data.items)
          setFilterResult(data.items)})
    }
    fetchUsers();
  }, []);

  //отбор студентов по критерию фильтрации
  const filterStudent = (student: IStudentsData, substring: string) => {
    if (student.name === undefined) {
      if (student.cohort.toLowerCase().includes(substring.toLowerCase())
          || student.email.toLowerCase().includes(substring.toLowerCase())
      ) {
        return true;
      }
    } else {
      if (student.cohort.toLowerCase().includes(substring.toLowerCase())
    || student.email.toLowerCase().includes(substring.toLowerCase())
    || student.name.toLowerCase().includes(substring.toLowerCase())) {
        return true;
      }
    } 
    return false;
  }

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = studentsData
      .filter(student => {
        if (e.target.value === '') {
          return studentsData
        }
        return filterStudent(student, e.target.value);
      });
    setQuery(e.target.value);
    setFilterResult(result);
    
  }

  const students = filterResult.map((user) => {
    return (<Student key={user._id} cohort={user.cohort} name={user.name ? user.name : ''} email={user.email} id={user._id}/>)
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
            //value={query}
            onChange={handleChange}
            placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
          />
          {query !== '' &&
          <button 
            className={styles.filter_clear} 
            type='reset' 
            onClick={() => {
              setQuery('');
              setFilterResult(studentsData)
            }} 
          />}
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
