export type UserRole = 'admin' | 'owner' | 'vet' | 'breeder'

export interface User {
  id: string
  username: string
  email: string
  name: string
  role: UserRole
}

export interface StoredUser extends User {
  password: string
}

export const usersFixture: StoredUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@medvet.ru',
    name: 'Администратор',
    password: 'admin',
    role: 'admin',
  },
  {
    id: '2',
    username: 'owner',
    email: 'owner@example.com',
    name: 'Мария Петрова',
    password: 'owner',
    role: 'owner',
  },
  {
    id: '3',
    username: 'agro',
    email: 'agro@agrohold.ru',
    name: 'ООО Агрохолдинг',
    password: 'agro',
    role: 'breeder',
  },
  {
    id: '4',
    username: 'vet',
    email: 'vet@clinic.ru',
    name: 'Ветклиника Зоодоктор',
    password: 'vet',
    role: 'vet',
  },
]
