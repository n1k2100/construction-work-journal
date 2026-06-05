import {
  Employee,
  PrismaClient,
  WorkType,
} from '@construction-work-journal/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import dayjs from 'dayjs'

import type { Prisma } from '@construction-work-journal/prisma/client'

const connectionUrl = process.env.DATABASE_URL

if (!connectionUrl) {
  throw new TypeError('Не удалось подключиться к базе данных!')
}

const adapter = new PrismaMariaDb(connectionUrl)
const prisma = new PrismaClient({ adapter })

async function createWorksType() {
  const worksType: Prisma.WorkTypeCreateInput[] = [
    {
      color: 'FF0000',
      title: 'Разработка грунта механизированным способом',
      unit: 'M3',
    },
    {
      color: '0000FF',
      title: 'Высококачественная штукатурка стен по маякам',
      unit: 'M2',
    },
    {
      color: 'FFA500',
      title: 'Прокладка трехжильного силового кабеля в гофре',
      unit: 'M',
    },
    {
      color: '008000',
      title: 'Монтаж одностворчатой межкомнатной двери',
      unit: 'PCS',
    },
    {
      color: '00FFFF',
      title: 'Монтаж каркаса из тяжелых металлических колонн',
      unit: 'TN',
    },
    {
      color: '1FF13A',
      title: 'Изготовление и монтаж мелкоштучных закладных деталей',
      unit: 'KG',
    },
    {
      color: '914351',
      title: 'Установка и пусконаладка комплекта системы видеонаблюдения',
      unit: 'SET',
    },
    {
      color: '1ff13a',
      title: 'Изготовление и монтаж мелкоштучных закладных деталей',
      unit: 'KG',
    },
    {
      color: '914351',
      title: 'Установка и пусконаладка комплекта системы видеонаблюдения',
      unit: 'SET',
    },
    { color: 'f39c12', title: 'Устройство бетонной подготовки', unit: 'M3' },
    { color: '9b59b6', title: 'Кладка кирпичных перегородок', unit: 'M2' },
    { color: '3498db', title: 'Монтаж натяжного потолка', unit: 'M2' },
    { color: '1abc9c', title: 'Оклейка стен обоями под покраску', unit: 'M2' },
    {
      color: '2ecc71',
      title: 'Окраска стен водно-dispersionной краской',
      unit: 'M2',
    },
    {
      color: 'e67e22',
      title: 'Укладка керамической плитки на пол',
      unit: 'M2',
    },
    { color: '34495e', title: 'Укладка ламината на подложку', unit: 'M2' },
    {
      color: '7f8c8d',
      title: 'Устройство стяжки пола самовыравнивающейся смесью',
      unit: 'M2',
    },
    {
      color: 'd35400',
      title: 'Прокладка трубопровода водоснабжения из полипропилена',
      unit: 'M',
    },
    {
      color: 'c0392b',
      title: 'Монтаж подвесного потолка "Армстронг"',
      unit: 'M2',
    },
    { color: '16a085', title: 'Установка радиатора отопления', unit: 'PCS' },
    {
      color: '27ae60',
      title: 'Установка электрической розетки или выключателя',
      unit: 'PCS',
    },
    { color: '2980b9', title: 'Монтаж распределительного щита', unit: 'SET' },
    {
      color: '8e44ad',
      title: 'Устройство обмазочной гидроизоляции',
      unit: 'M2',
    },
    {
      color: '2c3e50',
      title: 'Утепление фасада минераловатными плитами',
      unit: 'M2',
    },
    { color: 'f1c40f', title: 'Монтаж водосточной системы', unit: 'M' },
    {
      color: 'e74c3c',
      title: 'Установка межкомнатного дверного блока',
      unit: 'PCS',
    },
    {
      color: 'bdc3c7',
      title: 'Армирование железобетонных конструкций',
      unit: 'TN',
    },
    {
      color: '95a5a6',
      title: 'Монтаж металлических ферм покрытия',
      unit: 'TN',
    },
    {
      color: 'ea2027',
      title: 'Монтаж светильников светодиодных',
      unit: 'PCS',
    },
    {
      color: '006266',
      title: 'Установка санфаянса (унитаз, раковина)',
      unit: 'SET',
    },
    {
      color: '1b1464',
      title: 'Разработка грунта вручную в траншеях',
      unit: 'M3',
    },
    { color: '5758bb', title: 'Устройство песчаного основания', unit: 'M3' },
  ]

  await prisma.workType.createMany({
    data: worksType,
    skipDuplicates: true,
  })

  return prisma.workType.findMany({
    where: {
      title: {
        in: worksType.map((type) => type.title),
      },
    },
  })
}

async function createEmployees() {
  const employees: Prisma.EmployeeCreateInput[] = [
    { fullName: 'Иван Козлов', position: 'foreman' },
    { fullName: 'Александр Морозов', position: 'foreman' },
    { fullName: 'Пётр Иванов', position: 'foreman' },
    { fullName: 'Иван Смирнов', position: 'worker' },
    { fullName: 'Андрей Смирнов', position: 'worker' },
    { fullName: 'Дмитрий Васильев', position: 'worker' },
    { fullName: 'Михаил Попов', position: 'worker' },
    { fullName: 'Сергей Фёдоров', position: 'worker' },
    { fullName: 'Алексей Соколов', position: 'foreman' },
    { fullName: 'Роман Лебедев', position: 'foreman' },
    { fullName: 'Артем Кузнецов', position: 'worker' },
    { fullName: 'Николай Степанов', position: 'worker' },
    { fullName: 'Владимир Егоров', position: 'worker' },
    { fullName: 'Денис Новиков', position: 'worker' },
    { fullName: 'Павел Козлов', position: 'worker' },
    { fullName: 'Евгений Морозов', position: 'worker' },
    { fullName: 'Антон Петров', position: 'worker' },
    { fullName: 'Максим Волков', position: 'worker' },
    { fullName: 'Илья Соловьев', position: 'worker' },
    { fullName: 'Владислав Васильев', position: 'worker' },
    { fullName: 'Кирилл Зайцев', position: 'worker' },
    { fullName: 'Никита Павлов', position: 'worker' },
    { fullName: 'Олег Семенов', position: 'worker' },
    { fullName: 'Данила Голубев', position: 'worker' },
    { fullName: 'Егор Виноградов', position: 'worker' },
    { fullName: 'Илья Богданов', position: 'worker' },
    { fullName: 'Алексей Воробьев', position: 'worker' },
    { fullName: 'Федор Федоров', position: 'worker' },
    { fullName: 'Виталий Михайлов', position: 'worker' },
    { fullName: 'Вадим Беляев', position: 'worker' },
  ]

  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true,
  })

  return prisma.employee.findMany({
    where: {
      fullName: {
        in: employees.map((employee) => employee.fullName),
      },
    },
  })
}

async function createWorks(worksType: WorkType[], employees: Employee[]) {
  const works: Prisma.WorkCreateManyInput[] = [
    {
      date: dayjs().subtract(2, 'M').subtract(15, 'D').toDate(),
      employeeId: employees[0].id,
      typeId: worksType[0].id,
      volume: 319,
    },
    {
      date: dayjs().toDate(),
      employeeId: employees[3].id,
      typeId: worksType[3].id,
      volume: 510,
    },
    {
      date: dayjs().subtract(1, 'M').toDate(),
      employeeId: employees[1].id,
      typeId: worksType[1].id,
      volume: 120,
    },
    {
      date: dayjs().subtract(5, 'D').toDate(),
      employeeId: employees[2].id,
      typeId: worksType[2].id,
      volume: 450,
    },
    {
      date: dayjs().subtract(10, 'D').toDate(),
      employeeId: employees[4].id,
      typeId: worksType[4].id,
      volume: 15,
    },
    {
      date: dayjs().subtract(12, 'D').toDate(),
      employeeId: employees[5].id,
      typeId: worksType[5].id,
      volume: 230,
    },
    {
      date: dayjs().subtract(14, 'D').toDate(),
      employeeId: employees[6].id,
      typeId: worksType[6].id,
      volume: 3,
    },
    {
      date: dayjs().subtract(16, 'D').toDate(),
      employeeId: employees[7].id,
      typeId: worksType[7].id,
      volume: 85,
    },
    {
      date: dayjs().subtract(18, 'D').toDate(),
      employeeId: employees[8].id,
      typeId: worksType[8].id,
      volume: 140,
    },
    {
      date: dayjs().subtract(20, 'D').toDate(),
      employeeId: employees[9].id,
      typeId: worksType[9].id,
      volume: 95,
    },
    {
      date: dayjs().subtract(22, 'D').toDate(),
      employeeId: employees[10].id,
      typeId: worksType[10].id,
      volume: 110,
    },
    {
      date: dayjs().subtract(24, 'D').toDate(),
      employeeId: employees[11].id,
      typeId: worksType[11].id,
      volume: 320,
    },
    {
      date: dayjs().subtract(26, 'D').toDate(),
      employeeId: employees[12].id,
      typeId: worksType[12].id,
      volume: 180,
    },
    {
      date: dayjs().subtract(28, 'D').toDate(),
      employeeId: employees[13].id,
      typeId: worksType[13].id,
      volume: 250,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(2, 'D').toDate(),
      employeeId: employees[14].id,
      typeId: worksType[14].id,
      volume: 12,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(4, 'D').toDate(),
      employeeId: employees[15].id,
      typeId: worksType[15].id,
      volume: 90,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(6, 'D').toDate(),
      employeeId: employees[16].id,
      typeId: worksType[16].id,
      volume: 40,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(8, 'D').toDate(),
      employeeId: employees[17].id,
      typeId: worksType[17].id,
      volume: 150,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(10, 'D').toDate(),
      employeeId: employees[18].id,
      typeId: worksType[18].id,
      volume: 6,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(12, 'D').toDate(),
      employeeId: employees[19].id,
      typeId: worksType[19].id,
      volume: 350,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(14, 'D').toDate(),
      employeeId: employees[20].id,
      typeId: worksType[20].id,
      volume: 75,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(16, 'D').toDate(),
      employeeId: employees[21].id,
      typeId: worksType[21].id,
      volume: 180,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(18, 'D').toDate(),
      employeeId: employees[22].id,
      typeId: worksType[22].id,
      volume: 8,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(20, 'D').toDate(),
      employeeId: employees[23].id,
      typeId: worksType[23].id,
      volume: 4,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(22, 'D').toDate(),
      employeeId: employees[24].id,
      typeId: worksType[24].id,
      volume: 19,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(24, 'D').toDate(),
      employeeId: employees[25].id,
      typeId: worksType[25].id,
      volume: 14,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(26, 'D').toDate(),
      employeeId: employees[26].id,
      typeId: worksType[26].id,
      volume: 60,
    },
    {
      date: dayjs().subtract(1, 'M').subtract(28, 'D').toDate(),
      employeeId: employees[27].id,
      typeId: worksType[27].id,
      volume: 2,
    },
    {
      date: dayjs().subtract(2, 'M').toDate(),
      employeeId: employees[28].id,
      typeId: worksType[28].id,
      volume: 115,
    },
    {
      date: dayjs().subtract(2, 'M').subtract(5, 'D').toDate(),
      employeeId: employees[29].id,
      typeId: worksType[29].id,
      volume: 210,
    },
  ]

  return prisma.work.createMany({
    data: works,
    skipDuplicates: true,
  })
}

async function main() {
  const [worksType, employees] = await Promise.all([
    createWorksType(),
    createEmployees(),
  ])

  await createWorks(worksType, employees)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Скрипт успешно завершил работу!')
    process.exit(0)
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
